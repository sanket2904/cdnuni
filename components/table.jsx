


export default function Table() {
  return (
      <table className="w-full font-normal text-sm max-w-6xl">
          <thead>
              <tr style={{ backgroundColor: "#1a1a1a" }} >
                  <th className="w-1/3 text-left p-4">
                      <span style={{ color: "#a1a1a1" }}>Filename</span>
                  </th>
                  <th className="w-1/3 text-left p-4">
                      <span style={{ color: "#a1a1a1" }}>Filelink</span>
                  </th>
                  <th className="w-1/6 text-left p-4">
                      <span style={{ color: "#a1a1a1" }}>Creation Date</span>
                  </th>
                  <th className="w-1/6 text-left p-4">
                      <span style={{ color: "#a1a1a1" }}>Size</span>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr style={{ borderBottom: "1px solid #1a1a1a" }} className="text-sm p-4">
                  <td className="p-4">
                      <span className="">test.txt</span>

                  </td>
                  <td className="p-4">
                      <span className="">https://file.io/</span>
                  </td>
                  <td className="p-4">
                      <span className="">2021-01-01</span>
                  </td>
                  <td className="p-4">
                      <span className="">1.2MB</span>
                  </td>
              </tr>
              <tr className="text-sm p-4">
                  <td className="p-4">
                      <span className="">test.txt</span>

                  </td>
                  <td className="p-4">
                      <span className="">https://file.io/</span>
                  </td>
                  <td className="p-4">
                      <span className="">2021-01-01</span>
                  </td>
                  <td className="p-4">
                      <span className="">1.2MB</span>
                  </td>
              </tr>
          </tbody>
      </table>
  )
}