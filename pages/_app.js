import '../styles/globals.css'
import { ClientContextProvider } from '../contexts/ClientContext.jsx'
import { HMSRoomProvider } from '@100mslive/react-sdk'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ClientContextProvider>
        <HMSRoomProvider>
          <Component {...pageProps} />
        </HMSRoomProvider>
      </ClientContextProvider>
    </>
  )
}

export default MyApp
