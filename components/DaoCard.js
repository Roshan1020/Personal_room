export const DaoCard = ({ data }) => {
  return (
    <div className="min-w-max place-items-center antialiased text-gray-900">
      {/* style={{ 'height':'60vh',}} */}
      <div>
        <img
          src={data.logo}
          alt=" random imgee"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />
        {/* {"https://source.unsplash.com/random/350x350?sig=" + Math.floor((Math.random() * 10000))} */}
        <div className="relative px-4 -mt-16">
          <div className="bg-brand-med-dark text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-baseline">
              <span className="bg-brand-med-dark text-brand-green text-xs px-4 py-2 mt-2 mb-4 inline-block uppercase tracking-wide font-semibold rounded-r border-2 border-gray-400">
                {data.status}
              </span>
              {/* <div className="ml-2 text-gray-600 uppercase text-s font-semibold tracking-wider">

                                Active  &bull; 3 rooms
                            </div>                             
                            */}
            </div>
            <h4 className="mt-1 text-2xl font-semibold uppercase leading-tight truncate">
              {data.name}
            </h4>
            <div className="mt-1 text-s text-gray-400">
              <a href={data.website} target="_blank" rel="noreferrer">
                {data.website}
              </a>
            </div>
            {/* <div className="mt-4">
                            <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
                            <span className="text-sm text-gray-600">(based on 234 ratings)</span>
                        </div> */}
            <a href={'room-list/' + data.id} className="btn-primary mt-6 mb-3">
              View Rooms
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
