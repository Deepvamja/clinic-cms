import { useEffect, useState } from "react"
import { getMyReports } from "../../api/reportApi"

export default function Reports() {

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getMyReports().then(setData)
  }, [])

  return (

    <div>

      <h2 className="text-xl mb-4">My Reports</h2>

      {data.map((r) => (
        <div key={r.id} className="border p-3 mb-2">

          <p>Diagnosis: {r.diagnosis}</p>
          <p>Test: {r.testRecommended}</p>
          <p>{r.remarks}</p>

        </div>
      ))}

    </div>
  )
}