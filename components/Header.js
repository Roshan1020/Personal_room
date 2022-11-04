import { useEffect, useState } from 'react'
import { useWalletConnectClient } from '../contexts/ClientContext.jsx'

export const Header = () => {
  const { connect, signer } = useWalletConnectClient()
  const [signerAddress, setSignerAddress] = useState(null)

  useEffect(() => {
    ;(async () => {
      if (signer) setSignerAddress(await signer.getAddress())
    })()
  }, [signer])

  return (
    <div className="mb-4 pt-3 px-2">
      <div className="flex items-center justify-between m-6">
        <div className="float-left flex items-center">
          <img
            src="/emergence-logo.png"
            className="w-10 mr-4 inline"
            alt="Emergence"
          />
          <a
            href={'/'}
            className="text-brand-light text-3xl lowercase font-semibold tracking-tighter inline"
          >
            Emergence
          </a>
        </div>
        <div className="flex items-center gap-10">
          <a
            href={'/'}
            className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
          >
            home
          </a>
          <a
            href={'/admin'}
            className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
          >
            admin
          </a>
          {/* <a
            href={'/'}
            className="text-brand-light text-2xl lowercase font-semibold tracking-tighter inline"
          >
            transcripts
          </a> */}
          <div className="float-right">
            {signer ? (
              <span className="btn-secondary text-brand-light truncate w-44">
                {signerAddress}
              </span>
            ) : (
              <button
                className="btn-secondary flex-row-reverse"
                onClick={connect}
              >
                connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
