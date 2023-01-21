interface ProgressBarProps
{
    progress: number
}

export function ProgressBar(props: ProgressBarProps)
{
    const progressStyles =
    {
        width: `${props.progress}%`
    }
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div 
                role="progressbar"
                aria-label="Progresso de hábitos completados nesse dia"
                aria-aria-valuenow={props.progress}
                aria-value-max={100}
                className='h-3 rounded-xl bg-violet-600'
                style={progressStyles}
            />
        </div>
    )
}