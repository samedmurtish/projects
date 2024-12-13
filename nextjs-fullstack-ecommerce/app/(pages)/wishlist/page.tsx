"use client"; 

import React, { useEffect, useState } from 'react'

export default function WishlistPage() {

  useEffect(() => {
    console.log(localStorage.getItem("user"));
  }, [])

  const renderWishlistProducts = () => { 
    
    return <div></div>
  };

  return (
    <div className='w-3/4 mx-auto my-0 bg-white min-h-[500px] p-5'>
      <div className="text-2xl font-bold text-slate-500 mb-5">
        Wishlist
      </div>
      <div className='text-slate-500 text-2xl bg-slate-200 p-5 h-full'>
        {renderWishlistProducts()}
      </div>
    </div>
  )
}
