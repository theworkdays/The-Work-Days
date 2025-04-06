export default function CodeSnippet() {
  return (
    <div className="rounded-lg shadow-lg  p-4  bg-[#414141] contain-content">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs">assignment.py</div>
      </div>
      <pre className="text-[1rem] md:text-sm w-[72vw] sm:w-full  overflow-x-auto bg-[#171717] p-4 rounded-md ">
        <code className="language-python">
          <span className="text-blue-400">def</span> <span className="text-blue-400">calculate_optimization</span>
          <span className="text-white">(data):</span>
          <br />
          <span className="text-gray-500">{"    # Process the input"}</span>
          <br />
          <span className="text-purple-400">{"    results = []"}</span>
          <br />
          <span className="text-white">{"    for"}</span>
          <span className="text-white">{" item in data:"}</span>
          <br />
          <span className="text-white">{"        "}</span>
          <span className="text-green-400">analyzed</span>
          <span className="text-white">{" = "}</span>
          <span className="text-green-400">process_item</span>
          <span className="text-white">(item)</span>
          <br />
          <span className="text-white">{"        results.append(analyzed)"}</span>
          <br />
          <span className="text-red-400">{"    return"}</span>
          <span className="text-red-400">{" optimize_solution"}</span>
          <span className="text-white">(results)</span>
        </code>
      </pre>
    </div>
  )
}

