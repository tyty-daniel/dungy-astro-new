import { useState, useEffect } from 'preact/hooks';

export default function SeriesFilter({ husbandos }) {
  const [selectedSeries, setSelectedSeries] = useState('all');
  
  // Get unique series from husbandos
  const allSeries = [...new Set(husbandos.map(h => h.data.series))].sort();
  
  // Filter husbandos based on selected series
  const filteredHusbandos = selectedSeries === 'all' 
    ? husbandos 
    : husbandos.filter(h => h.data.series === selectedSeries);

  const handleSeriesChange = (e) => {
    setSelectedSeries(e.target.value);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="series-filter" className="text-sm font-medium">
          Filter by series:
        </label>
        <select
          id="series-filter"
          value={selectedSeries}
          onChange={handleSeriesChange}
          className="border border-blue-300 rounded px-2 py-1 text-sm"
        >
          <option value="all">All Series</option>
          {allSeries.map(series => (
            <option key={series} value={series}>{series}</option>
          ))}
        </select>
      </div>
      
      <ul className="m-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 border border-dotted border-blue-300 overflow-y-auto">
        {filteredHusbandos.map((post) => (
          <li key={post.id} className="p-1 flex flex-col items-center">
            <a href={`/husbandos/${post.id}/`}>
              <img
                className="object-top w-full object-cover rounded"
                src={post.data.heroImage}
                alt=""
                style="max-width: 100%;"
              />
              <h4 className="name text-center mt-2">{post.data.name}</h4>
              <p className="text-xs text-gray-600 text-center">{post.data.series}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}