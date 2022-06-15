import { useState, useMemo, useInsertionEffect, useEffect, ReactNode } from 'react'
import styles from './index.module.scss'
import { getData, str } from './api'
const SOURCE = [
    {
        title: 'Source',
        content: str
    },
    {
        title: 'Judement',
        content: str
    }
]


function SourceItem(props: {
    title: string
    content: string
}) {
    return <div className={styles.source_item}>
        <span className={styles.title}>{props.title}</span>
        <div className={styles.content}>{props.content}</div>
    </div>
}

/* 
todo
json高亮与折叠
 */
export default function UnitDetail(props: {
    unitId: string
    oncClose: () => void
}) {
    const [showSource, setShowSource] = useState(false)
    const [jobList, setJobList] = useState<any>([])
    const [jobId, setJobId] = useState('')
    const [contributorId, setContributorId] = useState('')
    const fetchData = async () => {
        const list = await getData()
        setJobList(list)
        setJobId(list[0].job.id)
        setContributorId(list[0].distSegment[0].workerId)
    }

    const currentJob = useMemo(() => jobList.find((d: any) => d.job.id === jobId), [jobList, jobId])
    const currentContibutor = useMemo(() => currentJob?.distSegment.find((d: any) => d.workerId === contributorId) || [], [contributorId, currentJob])
    useEffect(() => {
        fetchData()
    }, [])

    return <div className={styles.unit_detail}>
        <header>
            <span>Unit {props.unitId}</span>
            <span onClick={props.oncClose}>X</span>
        </header>
        <section>
            <div className={styles.left}>
                {
                    jobList.map((d: any, idx: number) => <span
                        key={idx}
                        className={d.job.id === jobId ? styles.active : ''}
                        onClick={() => setJobId(d.job.id)}
                    >Job {d.job.id}</span>)
                }
            </div>
            <div className={styles.right}>
                <div className={styles.info}>
                    <div className={styles.info_item}>
                        <span>ContibutorId</span>
                        <select value={contributorId} onChange={e => setContributorId(e.target.value)}>
                            {currentJob?.distSegment.map((d: any, idx: number) => <option
                                key={idx}
                                value={d.workerId}
                            >{d.workerId}</option>)}
                        </select>
                    </div>
                    <div className={styles.info_item}>
                        <span>Submited At</span>
                        <span>{currentContibutor.committedAt}</span>
                    </div>
                    <button onClick={() => setShowSource(!showSource)}>{showSource ? 'Hide' : 'Show'} Data</button>
                </div>
                {showSource ? <div className={styles.source}>
                    {/* todo update */}
                    {SOURCE.map((d, idx) => <SourceItem key={idx} {...d} />)}
                </div> : null}
                <div className={styles.editor}></div>
            </div>
        </section>
    </div>
}
