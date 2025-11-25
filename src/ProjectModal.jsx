// ProjectModal.jsx

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Code, Layers } from 'lucide-react'; 

const ProjectModal = ({ isOpen, onClose, project }) => {
    // State to control DOM mounting (true if open or transitioning out)
    const [shouldRender, setShouldRender] = useState(false);
    
    // State to control the visual transition (true = open/animate-in, false = hidden/animate-out)
    const [isTransitioningIn, setIsTransitioningIn] = useState(false);
    const ANIMATION_DURATION = 300; // Matches Tailwind's duration-300

    // ✨ NEW EFFECT: Scroll Lock on Body Element
    useEffect(() => {
        if (isOpen) {
            // Add 'overflow-hidden' to <body> when modal opens
            document.body.classList.add('overflow-hidden');
        } else {
            // Remove 'overflow-hidden' when modal closes
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup function: Ensures scroll is unlocked if component unmounts unexpectedly
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]); // Only runs when the 'isOpen' prop changes


    // Existing Animation Logic
    useEffect(() => {
        if (isOpen) {
            // 1. When opening, mount the component instantly.
            setShouldRender(true);
            
            // 2. Wait a tick (10ms) for the browser to apply the initial hidden state, then start the transition in.
            const timeoutIn = setTimeout(() => setIsTransitioningIn(true), 10);
            
            return () => clearTimeout(timeoutIn);

        } else if (!isOpen && shouldRender) {
            // 3. When closing, first start the transition out immediately.
            setIsTransitioningIn(false);
            
            // 4. Wait for the transition duration (300ms), then unmount the component.
            const timeoutOut = setTimeout(() => {
                setShouldRender(false);
            }, ANIMATION_DURATION);
            
            return () => clearTimeout(timeoutOut); // Cleanup timeout
        }
    }, [isOpen, shouldRender]);

    // Conditional Render Check: If not rendering, return null instantly.
    if (!shouldRender || !project) return null;


    return (
        <div 
            // Background Fade: Use isTransitioningIn to control opacity
            className={`
                fixed inset-0 bg-black flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out
                ${isTransitioningIn ? 'bg-opacity-70 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'}
            `}
            onClick={onClose} 
        >
            <div 
                // 💡 PULSE OUT ON CLOSE: Modal Content
                className={`
                    bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full 
                    max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out
                    ${isTransitioningIn 
                        ? 'scale-100 translate-y-0 opacity-100' // Open state: full size
                        : 'scale-105 -translate-y-10 opacity-0' // Closing State: Scale up (Pulse Out), Slide Up, Fade Out
                    }
                `}
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-900 dark:text-white hover:text-red-500 z-50 p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg"
                >
                    <X size={24} />
                </button>

                {/* --- Rest of Modal Content (Unchanged) --- */}
                <div className="relative h-64 w-full">
                    <img 
                        src={project.imagePreviewUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover rounded-t-xl" 
                    />
                </div>

                <div className="p-8">
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{project.title}</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{project.summary}</p>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3 flex items-center gap-2">
                        <Layers size={24} className="text-orange-600" /> Key Features
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 ml-4">
                        {project.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3 flex items-center gap-2">
                        <Code size={24} className="text-green-500" /> Tech Stack Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
                        {project.documentationLink && (
                            <a
                                href={project.documentationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                <Github size={20} /> Documentation
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                <ExternalLink size={20} /> Live Preview
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;