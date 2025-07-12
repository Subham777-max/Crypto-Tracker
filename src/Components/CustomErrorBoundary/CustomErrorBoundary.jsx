import { ErrorBoundary } from 'react-error-boundary'
function CustomErrorBoundaryUI({error,resetErrorBoundary}){
    return (
        <>
            <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center">
                <div>
                    <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="" className="h-[40%] w-full" />
                </div>
                <h1 className="text-2xl text-gray-900">Something went Wrong</h1>
                <p className="text-gray-600">{error?.message}</p>
                <button onClick={resetErrorBoundary} className="px-4 py-2 text-white bg-gray-900">Try Again</button>
            </div>
        </>
    );
}

export default function CustomErrorBoundary({ children }){
    return(
        <ErrorBoundary
            FallbackComponent={CustomErrorBoundaryUI}
            onReset={()=>window.location.reload()}
            >
                {children}
        </ErrorBoundary>
    );
}