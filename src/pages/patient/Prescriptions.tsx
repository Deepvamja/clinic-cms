import { useEffect, useState } from "react"
import { getMyPrescriptions } from "../../api/prescriptionApi"

export default function Prescriptions() {

  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    getMyPrescriptions().then(setData)
  }, [])

  return (

    <div>

      <h2 className="text-xl mb-4">My Prescriptions</h2>

      {data.map((p) => (
        <div key={p.id} className="border p-3 mb-2">

          {p.medicines.map((m: any, i: number) => (
            <p key={i}>{m.name} - {m.dosage}</p>
          ))}

          <p>{p.notes}</p>

        </div>
      ))}

    </div>
  )
}