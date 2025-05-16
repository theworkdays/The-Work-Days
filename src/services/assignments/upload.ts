'use server'

import { revalidatePath } from 'next/cache'
import { AppwriteException, ID } from 'node-appwrite'

import { createSession } from '@/config/appwrite.config'
import { projectbucketId } from '@/models/buckets/projectdetails'
import { UploadCollection } from '@/models/collections/upload.collection'
import { User } from '@/services/User.service'
import { handleError } from '@/utils/errorHandler'

import { estimateProjectPrice } from './getpriceprediction'

const ENABLE_ESTIMATION = process.env.ENABLE_PRICE_ESTIMATION 

export const uploaddef = async (
  file: File | undefined,
  title: string,
  description: string,
  subject: string,
  deadline: Date,
  phone: string
): Promise<{ error?: string; data?: unknown }> => {
  try {
    const session = await createSession()
    const { data: sessionData, error } = session
    if (error) throw new AppwriteException(error)

    const { storage, database } = sessionData!

    // Step 1: Upload file if present
    let fileId: string | null = null
    let publicUrl: string | null = null
    if (file) {
      const uploadedFile = await storage.createFile(projectbucketId, ID.unique(), file)
      fileId = uploadedFile.$id

      publicUrl = `https://cloud.appwrite.io/v1/storage/buckets/${projectbucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`
    }

    // Step 2: Get user
    const { data: user, error: userError } = await User.me()
    if (userError || !user) throw new AppwriteException(userError)

    const userId = user.$id

    // Step 3: Estimate price if enabled
    let estimatedPrice: string | null = null;
    if (ENABLE_ESTIMATION) {
      try {
        const estimation = await estimateProjectPrice({
          title,
          description,
          pdfUrl: publicUrl || undefined,
          deadline: Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
        })

        console.log('Estimation result:', estimation)

        if ('estimatedPrice' in estimation) {
          estimatedPrice = estimation.estimatedPrice as string
        }
        else{
           handleError("unexpected",'Failed to estimate price')
        }
      } catch (e) {
        console.error('Estimation failed:', e)
      }
    }

    // Step 4: Create document in collection
    const document = await database.createDocument(
      'main',
      UploadCollection,
      ID.unique(),
      {
        projectId: ID.unique(),
        projectTitle: title,
        description,
        subject,
        deadline: deadline.toISOString(),
        status: estimatedPrice ? 'reviewed' : 'under review',
        attachments: fileId,
        user: userId,
        Price: estimatedPrice ? parseInt(estimatedPrice) : null,
        Phone: phone,
      }
    )

    revalidatePath('/uploads')
    return {
      error: undefined,
      data: estimatedPrice
        ? {
            estimatedPrice,
            id: document.$id
          }
        : 'Document uploaded successfully (price estimation pending)'
    }
  } catch (e: unknown) {
    return handleError(e, 'Failed to upload and create document')
  }
}
