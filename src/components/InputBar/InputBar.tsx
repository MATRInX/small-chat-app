import React from 'react';

export default function InputBar() {
  return (
    <form>
      <input id="message" type="text" autoComplete="off" />
      <button>Send</button>
    </form>
  )
}