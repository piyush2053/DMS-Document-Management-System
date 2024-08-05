import { FolderOpenFilled } from '@ant-design/icons'
import { files } from '../Constants/constants'

export default function Documents() {
  return (
    <div className='m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
      {files.map((item, index) => (
        <div key={index} className='border p-4 rounded-lg hover:shadow-md cursor-pointer'>
          <FolderOpenFilled className='text-[100px] text-[#FFB300]' />
          <p className='font-bold'>{item.fileName}</p>
          <p>{item.date.toLocaleDateString()}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}
