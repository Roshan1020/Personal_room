
import { Header } from "../../components/Header";
import { RoomCard } from "../../components/RoomCard";
import roomData from '../../data/rooms.json';
import daoData from '../../data/daos.json';
import { useRouter } from 'next/router';


export default function RoomListPage() {
    
    const router = useRouter()
    const { daoId } = router.query

    let daoName = "";
    try {
        daoName = daoData[daoData.findIndex(x => x.id == daoId)].name;
    } catch {}    

    return (
        <div>
            <Header />
            <h2 className="text-gray-100 text-3xl tracking-tight mb-8 ml-8 font-bold">{daoName} Rooms</h2>
            <div className="mx-4">
                <div className="grid grid-cols-3 gap-4">
                {/* justify-center */}
                {/* grid grid-cols-3 gap-x-4 gap-y-0 bg-gray-400 */}
                {/* grid grid-flow-row-dense grid-cols-3  */}
                {roomData.map( (item, index) => {
                    return <RoomCard data={item} />
                } ) }    
                </div>   
            </div>   
        </div>
  )
}
