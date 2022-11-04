import Login from '../../components/Login'
import { HMSRoomProvider } from '@100mslive/react-sdk'
import { Header } from '../../components/Header'
import { useRouter } from 'next/router'

export default function RoomPage() {
  const router = useRouter()
  const { roomId } = router.query

  return (
    <HMSRoomProvider>
      <div>
        <Header />
        <Login roomId={roomId} />
      </div>
    </HMSRoomProvider>
  )
}
