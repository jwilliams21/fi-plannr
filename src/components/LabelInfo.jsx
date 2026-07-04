import { useState, useEffect } from 'react';

export default function LabelInfo({ label, description }) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handlePopState = (e) => {
            if(!e.state || e.state.modal !== 'info-overlay'){
                setIsOpen(false)
            }
        }

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const openModal = () => {
        setIsOpen(true);
        window.history.pushState({ modal: 'info-overlay' }, '');
    };

    const closeModal = () => {
        setIsOpen(false);
        if(window.history.state?.modal === 'info-overlay') {
            window.history.back();
        }
    };

    return (
        <div>
            <p className='bg-emerald-500 text-white px-2 rounded-lg' onClick={() => setIsOpen(!isOpen)}>?</p>
            {isOpen &&
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity' onClick={closeModal}>
                    <div className='relative overflow-y-auto text-white bg-emerald-600 border border-slate-200 rounded-2xl shadow-2xl p-6 font-semibold'>
                        <button
                            type='button'
                            onClick={closeModal}
                            className='absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-md'
                        >X</button>
                        <h3 className='text-xl font-bold pb-2'>{label}</h3>
                        <p>{description}</p>
                    </div>
                </div>
            }
        </div>
    )
}