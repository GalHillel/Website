"use client";

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Edit2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ListItem {
    id: string;
    [key: string]: any;
}

interface DynamicListEditorProps<T extends ListItem> {
    title: string;
    description?: string;
    items: T[];
    onUpdate: (items: T[]) => void;
    renderItem: (item: T, index: number, onEdit: () => void, onDelete: () => void) => React.ReactNode;
    renderEditForm: (item: T | null, onSave: (item: T) => void, onCancel: () => void) => React.ReactNode;
    createNew: () => T;
}

export default function DynamicListEditor<T extends ListItem>({
    title,
    description,
    items,
    onUpdate,
    renderItem,
    renderEditForm,
    createNew
}: DynamicListEditorProps<T>) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSave = (item: T) => {
        if (isCreating) {
            onUpdate([item, ...items]);
            setIsCreating(false);
        } else {
            onUpdate(items.map(i => i.id === item.id ? item : i));
            setEditingId(null);
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            onUpdate(items.filter(i => i.id !== id));
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsCreating(false);
    };

    return (
        <div className="bg-[#15171F] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-start bg-[#15171F]">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                    {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                </div>
                {!isCreating && !editingId && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                    >
                        <Plus className="w-4 h-4" /> Add Item
                    </button>
                )}
            </div>

            {/* List / Edit Area */}
            <div className="p-6 space-y-4 bg-[#0F1117]/50 min-h-[300px]">

                {/* CREATE MODE */}
                <AnimatePresence>
                    {isCreating && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#15171F] border border-blue-500/30 rounded-lg p-4 mb-4 ring-1 ring-blue-500/20"
                        >
                            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">Creating New Entry</h4>
                            {renderEditForm(null, handleSave, handleCancel)}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LIST */}
                <div className="space-y-3">
                    {items.length === 0 && !isCreating && (
                        <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-xl">
                            <p className="text-gray-500 text-sm">No items yet. Add one to get started.</p>
                        </div>
                    )}

                    {items.map((item, index) => (
                        <div key={item.id || index} className="relative group">
                            {editingId === item.id ? (
                                // EDIT MODE
                                <div className="bg-[#15171F] border border-blue-500/30 rounded-lg p-4 ring-1 ring-blue-500/20">
                                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">Editing Entry</h4>
                                    {renderEditForm(item, handleSave, handleCancel)}
                                </div>
                            ) : (
                                // VIEW MODE
                                renderItem(
                                    item,
                                    index,
                                    () => setEditingId(item.id),
                                    () => handleDelete(item.id)
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
