import React from 'react'
import CreateFileModal from './CreateFileModal'

const Footer = () => {
  return <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto flex justify-end">
        <CreateFileModal/>
      </div>
    </footer>
}

export default Footer
