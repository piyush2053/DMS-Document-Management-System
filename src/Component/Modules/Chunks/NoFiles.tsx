import { FileUnknownTwoTone } from '@ant-design/icons'

export default function NoFiles() {
    return (
        <div className='flex justify-center my-10'>
            <div className='text-center'>
                <FileUnknownTwoTone className='text-[52px] my-5' />
                <div>Sorry No documents found.</div>
                <div >You can try to upload one from here Upload section</div>
            </div>
        </div>
    )
}
