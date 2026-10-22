export function MuscleMap({ back = false }: { back?: boolean }) {
  return <svg viewBox="0 0 150 280" className="muscle-map" role="img" aria-label={back ? 'Back muscle recovery illustration' : 'Front muscle recovery illustration'}>
    <defs><linearGradient id={back ? 'body-back' : 'body-front'} x2="1" y2="1"><stop stopColor="#dddde1"/><stop offset="1" stopColor="#676971"/></linearGradient></defs>
    <g fill={`url(#${back ? 'body-back' : 'body-front'})`} stroke="#24252a" strokeWidth="1.4">
      <ellipse cx="75" cy="25" rx="14" ry="19"/><path d="M65 43v11L45 62 31 83 20 124 11 156 19 162 36 129 45 101 48 140 43 177 46 224 43 261 58 263 64 223 75 177 86 223 92 263 107 261 104 224 107 177 102 140 105 101 114 129 131 162 139 156 130 124 119 83 105 62 85 54V43Z"/>
      <path d="M75 60v107M48 140l27 11 27-11M75 177l-14-24M75 177l14-24M47 224l17-1M86 223l18 1" fill="none"/>
    </g>
    <g fill={back ? '#fa6e5f' : '#ff4056'} stroke="#24252a" strokeWidth="1.5">
      {back ? <><path d="m48 68 24-7v37l-20 18-8-23Z"/><path d="m102 68-24-7v37l20 18 8-23Z"/><path d="m53 117 20-14v37l-20-3Z"/><path d="m97 117-20-14v37l20-3Z"/><path d="m48 152 24 7-10 44-14 10Z"/><path d="m102 152-24 7 10 44 14 10Z"/></> : <><path d="m47 68 25-4v27l-25 4-6-14Z"/><path d="m103 68-25-4v27l25 4 6-14Z"/><path d="m34 90 10 6-8 29-10-4Z"/><path d="m116 90-10 6 8 29 10-4Z"/><path d="m51 154 20 5-11 54-12 4Z"/><path d="m99 154-20 5 11 54 12 4Z"/></>}
    </g><g stroke="#38393f" strokeWidth="1" fill="none"><path d="M62 101h26m-25 10h24m-22 11h20m-19 11h18M58 158l-7 39m41-39 7 39"/></g>
  </svg>;
}
