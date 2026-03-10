import { Settings, Save, Server, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Platform Settings</h1>
                    <p className="text-[13px] text-slate-500 mt-1">
                        Configure global variables, feature flags, and maintenance modes.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-medium text-[13px] shadow-sm">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">

                {/* Feature Flags */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                        <Globe className="w-4 h-4 text-violet-600" />
                        <h3 className="text-[14px] font-semibold text-slate-800">Feature Flags</h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-[13px] font-semibold text-slate-800">AI Catalogue Descriptions (Beta)</h4>
                                <p className="text-[12px] text-slate-500 mt-0.5">Allow Pro users to auto-generate product descriptions using AI.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                        <div className="h-px w-full bg-gray-100" />
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-[13px] font-semibold text-slate-800">Public Discoverability</h4>
                                <p className="text-[12px] text-slate-500 mt-0.5">Index new catalogues on the public marketplace automatically.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* API & Limits */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                        <Server className="w-4 h-4 text-violet-600" />
                        <h3 className="text-[14px] font-semibold text-slate-800">API & Rate Limits</h3>
                    </div>
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Free Tier Image Upload Limit (MB)</label>
                            <input
                                type="number"
                                defaultValue={50}
                                className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Pro Tier Image Upload Limit (MB)</label>
                            <input
                                type="number"
                                defaultValue={500}
                                className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-medium text-slate-700">Global API Requests / min (Per IP)</label>
                            <input
                                type="number"
                                defaultValue={100}
                                className="w-full text-[13px] border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Maintenance */}
                <div className="bg-white rounded-xl border-red-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-red-100 flex items-center gap-2 bg-red-50/50">
                        <Shield className="w-4 h-4 text-red-600" />
                        <h3 className="text-[14px] font-semibold text-red-800">Danger Zone</h3>
                    </div>
                    <div className="p-5 flex items-center justify-between">
                        <div>
                            <h4 className="text-[13px] font-semibold text-slate-800">Global Maintenance Mode</h4>
                            <p className="text-[12px] text-slate-500 mt-0.5 max-w-xl">Enabling this prevents all non-admin users from logging in or modifying data. Public catalogues will display a "Maintenance" overlay.</p>
                        </div>
                        <button className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-[13px] font-medium transition-colors">
                            Enable Maintenance
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
