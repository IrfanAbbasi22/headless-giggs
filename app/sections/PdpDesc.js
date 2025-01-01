import React from 'react';
import './pdpDesc.css';

const PdpDesc = ({data}) => {
  return (
    <section className='pdpDescWrapper py-4 lg:py-[60px] text-sm tracking-wide text-raisinBlack '>
        <div className='container'>
            {data && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data,
                }}
                className={`text-black flex flex-col gap-3`}
              />
            )}
        </div>
    </section>
  )
}

export default PdpDesc;