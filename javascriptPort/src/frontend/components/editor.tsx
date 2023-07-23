import { useEffect, useRef, useState } from "react"
import EditorLib from "../EditorLibrary/Editor";
import styles from "../styles/editor.module.css";

export default function Editor() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [shapes, setShapes] = useState([]);
    const [editor, setEditor] = useState<null | EditorLib>(null);
    const [dims, setDims] = useState<{width: (null | number); height: (null | number)}>({width: null, height: null});
    useEffect(() => {
        const c = canvas.current?.getContext("2d")
        if(c){
            if(canvas.current){
                const newE = new EditorLib(canvas.current)
                setEditor(newE);
            }
        }
    }, [canvas, dims]);
    
    useEffect(() => {
        editor?.draw()
    }, [editor, shapes])

    useEffect(() => {
        window.devicePixelRatio = 2;
        setDims({width: window.innerWidth, height: innerHeight})
    }, []);

    return (
        <>
            {
                dims.width && dims.height &&
                <div className={`max-h-[100vh] max-w-[100vw] overflow-hidden ${styles.bgGrid}`}>
                    <canvas ref={canvas} className="max-w-[100vw] max-h-[100vh]" width={dims.width} height={dims.height}></canvas>
                </div>
            }
        </>
    )
}