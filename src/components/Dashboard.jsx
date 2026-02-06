import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Save, Plus, CheckCircle2, Circle, Trash2, LogOut, LayoutDashboard, Calendar } from 'lucide-react';

export default function Dashboard({ currentUser, onLogout, members, onUpdatePassword }) {
    // Initialize tasks with some data if local storage is empty
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('bakchodi_tasks');
        if (saved) return JSON.parse(saved);
        return [
            { id: 1, text: "Prank the HR department with 100 rubber ducks", assigneeId: 2, status: 'pending', deadline: '2024-05-20' },
            { id: 2, text: "Find the missing squeaky hammer", assigneeId: 3, status: 'completed', deadline: '2024-05-15' },
        ];
    });

    const [newTask, setNewTask] = useState('');
    const [assignee, setAssignee] = useState(''); // Init empty, set in effect based on permissions

    // Permission Logic
    const isHead = [2, 3, 4, 8].includes(currentUser.id); // Added Yashvi (8)
    const isManagement = currentUser.isAdmin || currentUser.id === 3; // Yash & Drashti see all
    const canAssignParams = {
        1: members.filter(m => m.id !== 1), // Yash -> Everyone
        2: members.filter(m => m.id === 6), // Bhavy -> Vaishali
        3: members.filter(m => m.id !== 3), // Drashti -> Everyone
        4: members.filter(m => m.id === 7), // Preet -> Riddhi
        8: members.filter(m => m.id === 8), // Yashvi -> Herself (Independent Chaos)
    };
    const assignableMembers = canAssignParams[currentUser.id] || [];

    useEffect(() => {
        if (assignableMembers.length > 0) {
            setAssignee(assignableMembers[0].id);
        }
    }, [currentUser.id]);

    // Password Management State
    const [selectedMemberForPwd, setSelectedMemberForPwd] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwdSuccess, setPwdSuccess] = useState('');

    useEffect(() => {
        localStorage.setItem('bakchodi_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim() || !assignee) return;

        const task = {
            id: Date.now(),
            text: newTask,
            assigneeId: parseInt(assignee),
            status: 'pending',
            deadline: new Date().toISOString().split('T')[0], // today
            assignedBy: currentUser.id
        };

        setTasks([task, ...tasks]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        if (!selectedMemberForPwd || !newPassword) return;

        onUpdatePassword(selectedMemberForPwd, newPassword);
        setPwdSuccess('Password updated successfully!');
        setNewPassword('');
        setTimeout(() => setPwdSuccess(''), 3000);
    };

    const visibleTasks = isManagement
        ? tasks
        : currentUser.id === 2 // Bhavy sees his + Vaishali's
            ? tasks.filter(t => t.assigneeId === 2 || t.assigneeId === 6)
            : currentUser.id === 4 // Preet sees his + Riddhi's
                ? tasks.filter(t => t.assigneeId === 4 || t.assigneeId === 7)
                : currentUser.id === 8 // Yashvi sees her own chaos
                    ? tasks.filter(t => t.assigneeId === 8)
                    : tasks.filter(t => t.assigneeId === currentUser.id);

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none"></div>

            <div className="max-w-5xl mx-auto space-y-12 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                System Online
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                            Mission Control
                        </h1>
                        <p className="text-lg text-slate-500 mt-2 font-medium">
                            Ready for chaos, <span className="text-purple-600 border-b-2 border-purple-200">{currentUser.name.split(' ')[0]}</span>? 🚀
                        </p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="group flex items-center gap-3 px-6 py-3 bg-white rounded-2xl font-bold text-slate-600 shadow-sm border border-slate-200 hover:border-red-100 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                    >
                        <span className="text-sm">Disconnect</span>
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Admin Stats Cards */}
                {currentUser.isAdmin && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <StatsCard
                            label="Total Operations"
                            value={tasks.length}
                            icon={<LayoutDashboard size={20} />}
                            color="text-slate-900"
                        />
                        <StatsCard
                            label="Pending Chaos"
                            value={tasks.filter(t => t.status === 'pending').length}
                            icon={<Circle size={20} />}
                            color="text-orange-500"
                        />
                        <StatsCard
                            label="Executed"
                            value={tasks.filter(t => t.status === 'completed').length}
                            icon={<CheckCircle2 size={20} />}
                            color="text-green-500"
                        />
                        <StatsCard
                            label="Clearance Level"
                            value="TOP SECRET"
                            icon={<Shield size={20} />}
                            color="text-purple-600"
                            isText
                        />
                    </div>
                )}


                {/* Action Grid (Forms) */}
                {(currentUser.isAdmin || isHead) && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Assign Task Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            onSubmit={handleAddTask}
                            className={`bg-white p-8 rounded-[2.5rem] shadow-xl shadow-purple-900/5 border border-white relative overflow-hidden group ${!currentUser.isAdmin ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-fuchsia-400"></div>

                            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Plus className="text-purple-500" />
                                Initiate New Mission
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Mission Directive</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Operation Squeaky Hammer"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 font-medium text-slate-700 focus:bg-purple-50 focus:text-purple-900 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-300"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Assign Agent</label>
                                        <div className="relative">
                                            <select
                                                value={assignee}
                                                onChange={(e) => setAssignee(e.target.value)}
                                                className="w-full bg-slate-50 border-0 rounded-2xl px-5 py-4 font-bold text-slate-700 focus:bg-purple-50 focus:text-purple-900 focus:ring-2 focus:ring-purple-200 transition-all appearance-none cursor-pointer"
                                            >
                                                {assignableMembers.map(m => (
                                                    <option key={m.id} value={m.id}>{m.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <div className="w-2 h-2 border-r-2 border-b-2 border-current rotate-45 transform -translate-y-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="col-span-1 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-wide hover:bg-purple-600 hover:scale-105 transition-all shadow-lg active:scale-95"
                                    >
                                        Deploy
                                    </button>
                                </div>
                            </div>
                        </motion.form>

                        {/* Security Form (Admin) */}
                        {currentUser.isAdmin && (
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                onSubmit={handlePasswordUpdate}
                                className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-900/10 border border-slate-800 relative overflow-hidden"
                            >
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>

                                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                    <Key className="text-purple-400" />
                                    Security Override
                                </h3>

                                <div className="space-y-4 relative z-10">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Target Employee</label>
                                        <select
                                            value={selectedMemberForPwd}
                                            onChange={(e) => setSelectedMemberForPwd(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 font-medium text-slate-200 focus:border-purple-500 focus:bg-slate-800/50 transition-all"
                                        >
                                            <option value="">Select ID...</option>
                                            {members.map(m => (
                                                <option key={m.id} value={m.id}>{m.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="New Access Key"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 font-mono text-purple-300 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 transition-all"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-purple-600 text-white px-5 rounded-2xl hover:bg-purple-500 transition-colors"
                                        >
                                            <Save size={20} />
                                        </button>
                                    </div>
                                    {pwdSuccess && <p className="text-green-400 text-xs font-bold text-center">{pwdSuccess}</p>}
                                </div>
                            </motion.form>
                        )}
                    </div>
                )}

                {/* Task List Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <h2 className="text-2xl font-black text-slate-900">
                            {isManagement ? 'Global Operations Log' : isHead ? 'Department Log' : 'Your Missions'}
                        </h2>
                        <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500">
                            Live Feed
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        <div className="grid grid-cols-1 gap-4">
                            {visibleTasks.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-20 text-center"
                                >
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 text-3xl shadow-sm">
                                        🕊️
                                    </div>
                                    <p className="text-slate-500 font-medium">Peace has been restored to the galaxy.</p>
                                    <p className="text-slate-400 text-sm">No pending missions.</p>
                                </motion.div>
                            ) : (
                                visibleTasks.map(task => {
                                    const assignedMember = members.find(m => m.id === task.assigneeId);

                                    return (
                                        <motion.div
                                            layout
                                            key={task.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className={`group relative p-6 rounded-3xl border transition-all duration-300 flex items-start gap-5 ${task.status === 'completed'
                                                    ? 'bg-slate-50/50 border-slate-100 opacity-60'
                                                    : 'bg-white border-slate-100 shadow-lg shadow-slate-200/50 hover:border-purple-100 hover:shadow-purple-500/5'
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleTask(task.id)}
                                                className={`mt-1 bg-white rounded-full p-2 border-2 transition-all shadow-sm ${task.status === 'completed'
                                                        ? 'border-green-500 text-green-500'
                                                        : 'border-slate-200 text-slate-200 hover:border-purple-400 hover:text-purple-400'
                                                    }`}
                                            >
                                                <CheckCircle2 size={20} className={task.status === 'completed' ? 'opacity-100' : 'opacity-0'} />
                                            </button>

                                            <div className="flex-1 space-y-2">
                                                <p className={`text-lg font-bold leading-relaxed ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                    {task.text}
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    {currentUser.isAdmin && assignedMember && (
                                                        <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 rounded-full border border-purple-100">
                                                            <img src={assignedMember.image} className="w-5 h-5 rounded-full object-cover" alt="" />
                                                            <span className="text-xs font-bold text-purple-700">{assignedMember.name}</span>
                                                        </div>
                                                    )}
                                                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {task.deadline}
                                                    </span>
                                                </div>
                                            </div>

                                            {currentUser.isAdmin && (
                                                <button
                                                    onClick={() => deleteTask(task.id)}
                                                    className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Sub-component for clean Stats Grid
const StatsCard = ({ label, value, icon, color, isText }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-32 md:h-40 relative group overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-50 group-hover:scale-110 transition-transform ${color}`}>{icon}</div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>

        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className={`font-black tracking-tight ${isText ? 'text-lg md:text-xl' : 'text-3xl md:text-5xl'} ${color} mb-1`}>
            {value}
        </span>
    </div>
);
