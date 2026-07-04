import { useEffect, useRef } from 'react';

// Custom lerping cursor dot used on the project/about pages (mix-blend-mode: difference).
// Touch devices have no cursor to replace — skip the whole rAF loop there.
const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (isTouch()) return;
    const cursor = cursorRef.current;
    let mx = -100, my = -100, cx = -100, cy = -100;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      if (cursor) {
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onEnter = () => cursor && cursor.classList.add('large');
    const onLeave = () => cursor && cursor.classList.remove('large');
    const attachTargets = () => document.querySelectorAll('a, img');
    const observer = new MutationObserver(() => {
      attachTargets().forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    attachTargets().forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
      attachTargets().forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  if (isTouch()) return null;
  return <div className="cursor" ref={cursorRef} />;
}
