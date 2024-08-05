import { Skeleton } from 'antd'
import React, { useEffect } from 'react'
import TableRecords from './Modules/TableRecords'


interface ListProps {
    loading: boolean;
    Records: any; 
  }

  const List: React.FC<ListProps> = ({ loading, Records }) => {
    useEffect(() => {
    }, [Records]);

    return (
        <div className='mt-7 m-3'>
            <Skeleton loading={loading} active avatar>
                <TableRecords Records={Records}/>
            </Skeleton>
        </div>
    )
}

export default List;
