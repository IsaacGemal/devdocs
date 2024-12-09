import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Search, Star, AlertTriangle } from 'lucide-react'

const DocScoreApp = () => {
    const [apis, setApis] = useState([
        {
            id: 1,
            name: 'Stripe',
            url: 'https://stripe.com/docs',
            rating: 4.8,
            votes: 532,
            issues: ['Some advanced concepts could use more examples'],
            strengths: ['Clear navigation', 'Great code examples', 'Interactive tutorials']
        },
        {
            id: 2,
            name: 'Twilio',
            url: 'https://www.twilio.com/docs',
            rating: 2.1,
            votes: 328,
            issues: ['Frequent typos', 'Outdated examples', 'Confusing navigation'],
            strengths: ['Good API reference']
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')

    const filteredApis = apis.filter(api =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-6xl mx-auto p-6">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">DevDocs</h1>
                <p className="text-xl text-gray-600">
                    <span className="font-mono">rate()</span> and discover great API documentation
                </p>
            </header>

            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search API documentation..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* API List */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredApis.map(api => (
                    <div key={api.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{api.name}</h2>
                            <div className="flex items-center">
                                <Star className="text-yellow-400" size={20} fill="currentColor" />
                                <span className="ml-1 font-bold">{api.rating.toFixed(1)}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <a
                                href={api.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                View Documentation
                            </a>
                            <div className="text-sm text-gray-500 mt-1">
                                {api.votes} votes
                            </div>
                        </div>

                        {/* Strengths */}
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2 flex items-center">
                                <ThumbsUp size={16} className="mr-2 text-green-500" />
                                Strengths
                            </h3>
                            <ul className="text-sm">
                                {api.strengths.map((strength, idx) => (
                                    <li key={idx} className="mb-1">{strength}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Issues */}
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center">
                                <AlertTriangle size={16} className="mr-2 text-orange-500" />
                                Areas for Improvement
                            </h3>
                            <ul className="text-sm">
                                {api.issues.map((issue, idx) => (
                                    <li key={idx} className="mb-1">{issue}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Rating Buttons */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button className="p-2 rounded hover:bg-gray-100">
                                <ThumbsUp size={20} className="text-gray-600" />
                            </button>
                            <button className="p-2 rounded hover:bg-gray-100">
                                <ThumbsDown size={20} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DocScoreApp
