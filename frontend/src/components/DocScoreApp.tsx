import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Search, AlertTriangle } from 'lucide-react'

const DevDocsApp = () => {
    const [apis, setApis] = useState([
        {
            id: 1,
            name: 'Stripe',
            url: 'https://stripe.com/docs',
            votes: 532,
            issues: ['Some advanced concepts could use more examples'],
            strengths: ['Clear navigation', 'Great code examples', 'Interactive tutorials']
        },
        {
            id: 2,
            name: 'Twilio',
            url: 'https://www.twilio.com/docs',
            votes: 328,
            issues: ['Frequent typos', 'Outdated examples', 'Confusing navigation'],
            strengths: ['Good API reference']
        }
    ])

    const [searchTerm, setSearchTerm] = useState('')

    const filteredApis = apis.filter(api =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleVote = (apiId: number, isUpvote: boolean) => {
        setApis(apis.map(api => {
            if (api.id === apiId) {
                return {
                    ...api,
                    votes: isUpvote ? api.votes + 1 : api.votes - 1
                }
            }
            return api
        }))
    }

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
                    className="w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* API List */}
            <div className="grid gap-8 md:grid-cols-2">
                {filteredApis.map(api => (
                    <div key={api.id} className="border rounded-xl p-8 hover:shadow-md transition-all duration-300 bg-white">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{api.name}</h2>
                            <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {api.votes} votes
                            </div>
                        </div>

                        {/* Documentation Link */}
                        <a
                            href={api.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mb-6 text-blue-500 hover:text-blue-700 font-medium hover:underline transition-colors"
                        >
                            View Documentation →
                        </a>

                        {/* Strengths */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3 flex items-center text-gray-800">
                                <ThumbsUp size={18} className="mr-2 text-green-500" />
                                Strengths
                            </h3>
                            <ul className="space-y-2">
                                {api.strengths.map((strength, idx) => (
                                    <li key={idx} className="flex items-center text-gray-600">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        {strength}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Issues */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3 flex items-center text-gray-800">
                                <AlertTriangle size={18} className="mr-2 text-orange-500" />
                                Areas for Improvement
                            </h3>
                            <ul className="space-y-2">
                                {api.issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-center text-gray-600">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                                        {issue}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Rating Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                className="p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                                onClick={() => handleVote(api.id, true)}
                            >
                                <ThumbsUp size={22} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                            </button>
                            <button
                                className="p-3 rounded-lg hover:bg-gray-100 transition-colors group"
                                onClick={() => handleVote(api.id, false)}
                            >
                                <ThumbsDown size={22} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DevDocsApp
