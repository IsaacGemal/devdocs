import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SubmitDocFormProps {
    onClose: () => void
    onSubmit: (doc: {
        name: string
        url: string
        strengths: string[]
        issues: string[]
    }) => void
}

const SubmitDocForm = ({ onClose, onSubmit }: SubmitDocFormProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        url: '',
        strengths: [''],
        issues: ['']
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({
            ...formData,
            strengths: formData.strengths.filter(s => s.trim() !== ''),
            issues: formData.issues.filter(i => i.trim() !== '')
        })
    }

    const addField = (field: 'strengths' | 'issues') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }))
    }

    const updateField = (field: 'strengths' | 'issues', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6">Submit API Documentation</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="mb-3">
                            <h2 className="text-lg font-semibold mb-2">API Name</h2>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full p-2 border rounded"
                                placeholder="Enter API name"
                            />
                        </div>

                        <div className="mb-3">
                            <h2 className="text-lg font-semibold mb-2">Documentation URL</h2>
                            <input
                                type="url"
                                required
                                value={formData.url}
                                onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
                                className="w-full p-2 border rounded"
                                placeholder="Enter documentation URL"
                            />
                        </div>

                        <div className="mb-3">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute w-full text-center">
                                    <h2 className="text-lg font-semibold mb-2">Strengths</h2>
                                </div>
                                <div className="invisible">
                                    <h2 className="text-lg font-semibold mb-2">Strengths</h2>
                                </div>
                                <div className="space-x-3 z-10">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.strengths.length > 1) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    strengths: prev.strengths.slice(0, -1)
                                                }))
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800 font-bold text-2xl"
                                    >
                                        −
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addField('strengths')}
                                        className="text-blue-600 hover:text-blue-800 font-bold text-2xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {formData.strengths.map((strength, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    value={strength}
                                    onChange={e => updateField('strengths', index, e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-2"
                                    placeholder="e.g., Clear examples"
                                />
                            ))}
                        </div>

                        <div className="mb-3">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute w-full text-center">
                                    <h2 className="text-lg font-semibold mb-2">Areas for Improvement</h2>
                                </div>
                                <div className="invisible">
                                    <h2 className="text-lg font-semibold mb-2">Areas for Improvement</h2>
                                </div>
                                <div className="space-x-3 z-10">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.issues.length > 1) {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    issues: prev.issues.slice(0, -1)
                                                }))
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800 font-bold text-2xl"
                                    >
                                        −
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => addField('issues')}
                                        className="text-blue-600 hover:text-blue-800 font-bold text-2xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {formData.issues.map((issue, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="text"
                                        value={issue}
                                        onChange={e => updateField('issues', index, e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-2"
                                        placeholder="e.g., Needs more examples"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubmitDocForm