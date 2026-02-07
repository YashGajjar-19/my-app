import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Plus, CheckCircle2, Circle, Trash2, LogOut, LayoutDashboard, Calendar, ArrowRight } from 'lucide-react';

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
    const [assignee, setAssignee] = useState('');
    
    // Permission Logic
    const isHead = [2, 3, 4, 8].includes(currentUser.id);
    const isManagement = currentUser.isAdmin || currentUser.id === 3;
    const canAssignParams = {
        1: members.filter(m => m.id !== 1),
        2: members.filter(m => m.id === 6),
        3: members.filter(m => m.id !== 3),
        4: members.filter(m => m.id === 7),
        8: members.filter(m => m.id === 8),
    };
    const assignableMembers = canAssignParams[currentUser.id] || [];

    useEffect(() => {
        if (assignableMembers.length > 0) {
            setAssignee(assignableMembers[0].id);
        }
    }, [currentUser.id]);

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
            deadline: new Date().toISOString().split('T')[0],
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
        : currentUser.id === 2
            ? tasks.filter(t => t.assigneeId === 2 || t.assigneeId === 6)
            : currentUser.id === 4
                ? tasks.filter(t => t.assigneeId === 4 || t.assigneeId === 7)
                : currentUser.id === 8
                    ? tasks.filter(t => t.assigneeId === 8)
                    : tasks.filter(t => t.assigneeId === currentUser.id);

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-slate-50 relative overflow-hidden">
             {/* Decor */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

            <div className="max-w-6xl mx-auto space-y-16 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-200">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight leading-none mb-2">
                            Dashboard.
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">
                            Welcome back, <span className="text-indigo-600 font-bold">{currentUser.name}</span>.
                        </p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="group flex items-center gap-3 px-6 py-3 bg-white rounded-xl font-bold text-slate-600 shadow-sm border border-slate-200 hover:border-red-100 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 self-start md:self-auto"
                    >
                        <span className="text-sm uppercase tracking-wide">Sign Out</span>
                        <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Stats Grid */}
                {currentUser.isAdmin && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <MinimalStat label="Total Missions" value={tasks.length} />
                        <MinimalStat label="Pending" value={tasks.filter(t => t.status === 'pending').length} color="text-amber-500" />
                        <MinimalStat label="Completed" value={tasks.filter(t => t.status === 'completed').length} color="text-green-500" />
                        <MinimalStat label="Clearance" value="Lvl 5" color="text-indigo-600" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content: Tasks */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 font-display">Active Directives</h2>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {visibleTasks.length === 0 ? (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center bg-white rounded-3xl border border-slate-100 border-dashed">
                                        <div className="text-4xl mb-4">☕</div>
                                        <p className="text-slate-400 font-medium">All quiet on the western front.</p>
                                    </motion.div>
                                ) : (
                                    visibleTasks.map(task => {
                                        const assignedMember = members.find(m => m.id === task.assigneeId);
                                        return (
                                            <motion.div
                                                layout
                                                key={task.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className={`group p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                                                    task.status === 'completed' 
                                                    ? 'bg-slate-50 border-slate-100 opacity-60' 
                                                    : 'bg-white border-slate-100 hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-100'
                                                }`}
                                            >
                                                <button
                                                    onClick={() => toggleTask(task.id)}
                                                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        task.status === 'completed'
                                                        ? 'bg-green-500 border-green-500 text-white'
                                                        : 'border-slate-300 text-transparent hover:border-indigo-500'
                                                    }`}
                                                >
                                                    <CheckCircle2 size={14} />
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-base font-bold leading-snug mb-2 ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                                                        {task.text}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={12} />
                                                            {task.deadline}
                                                        </span>
                                                        {currentUser.isAdmin && assignedMember && (
                                                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                                {assignedMember.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {currentUser.isAdmin && (
                                                    <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-8">
                        {(currentUser.isAdmin || isHead) && (
                            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                
                                <h3 className="text-lg font-bold font-display mb-6 relative z-10 flex items-center gap-2">
                                    <Plus size={18} className="text-indigo-400" />
                                    New Assignment
                                </h3>

                                <form onSubmit={handleAddTask} className="space-y-4 relative z-10">
                                    <input
                                        type="text"
                                        placeholder="Directive description..."
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                                    />
                                    
                                    <div className="relative">
                                        <select
                                            value={assignee}
                                            onChange={(e) => setAssignee(e.target.value)}
                                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                        >
                                            {assignableMembers.map(m => (
                                                <option key={m.id} value={m.id} className="bg-slate-900 text-slate-300">{m.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-indigo-900/20">
                                        Assign
                                    </button>
                                </form>
                            </div>
                        )}

                        {currentUser.isAdmin && (
                             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
                                    <Key size={18} className="text-emerald-500" />
                                    Admin Override
                                </h3>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <select
                                        value={selectedMemberForPwd}
                                        onChange={(e) => setSelectedMemberForPwd(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-indigo-500 transition-all"
                                    >
                                        <option value="">Select Personnel...</option>
                                        {members.map(m => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="New Passcode"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
                                    />
                                    <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors">
                                        Update Credentials
                                    </button>
                                    {pwdSuccess && <p className="text-green-600 text-xs font-bold text-center mt-2">{pwdSuccess}</p>}
                                </form>
                             </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const MinimalStat = ({ label, value, color = "text-slate-900" }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
        <span className={`text-3xl font-bold font-display ${color}`}>{value}</span>
    </div>
);
