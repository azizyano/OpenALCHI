import React, { useEffect, useState } from 'react'

const Modal = (open) => {
    function close (){
        if (open) {
            open = true
        }
    }
    return(
        <div class="mx-auto max-w-md bg-primary p-8 rounded-2xl shadow-sm" id="headlessui-dialog-panel-:r0:">
            <h2 class="text-light text-center text-2xl font-semibold" id="headlessui-dialog-title-:r1:">Welcome to Sonne Finance</h2>
            <p class="text-neutral font-extralight pt-8 pb-4" id="headlessui-description-:r2:">Sonne Finance is a decentralized, non-custodial lending protocol.</p>
            <p class="text-neutral font-extralight pb-4">By accessing the Sonne Finance website, you agree to the 
            <a target="_blank" rel="noopener noreferrer" href="https://docs.sonne.finance/other-information/legal-disclaimer" class="text-light focus:outline-none outline-none focus-visible:outline-none" tabindex="0">Terms of Use.</a></p>
            <label class="flex items-center gap-4 mb-8 text-neutral font-extralight text-sm hover:cursor-pointer">
                <input class="text-light focus:outline-none focus:border-none focus:ring-transparent focus:ring-offset-transparent checked:outline-none checked:border-none border-none" type="checkbox"/>
                I have read and agree to this message, don't show it again for 30 days.</label>
                <div class="group col-span-1 w-full">
                    <button onClick={() => close() } class="h-[44px] border-2 rounded-2xl transition duration-150 ease-in-out group-hover:bg-light hover:bg-light w-full border-light text-neutral">Agree</button>
                </div>
        </div>
    )
}
export default Modal
