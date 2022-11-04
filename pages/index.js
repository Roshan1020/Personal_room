import { Header } from '../components/Header'
import { DaoCard } from '../components/DaoCard'
import daoData from '../data/daos.json'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-8 justify-center mt-20">
        {/* justify-center */}
        {/* grid grid-cols-3 gap-x-4 gap-y-0 bg-gray-400 */}
        {/* grid grid-flow-row-dense grid-cols-3  */}
        {daoData.map((item, index) => {
          return <DaoCard key={index} data={item} />
        })}
      </div>
    </div>
  )
}
