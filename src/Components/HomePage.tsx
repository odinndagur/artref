import { useEffect, useState } from "react"
import './HomePage.css'
function HomePage(){
    const baseUrl = 'https://api.reddit.com/r/'
    const urlSuffix = '.json'
    const [images, setImages] = useState<string[]>([])
    const [loaded, setLoaded] = useState(false)
    const [sub, setSub] = useState('')
    const isImgUrl = (url:string) => {
        return /\.(jpe?g|png|webp|avif|gif)$/.test(url)
      }
    const fetchImagesFromSub = (sub:string) => {
        const fullUrl = baseUrl + sub + urlSuffix
        fetch(fullUrl).then(res => res.json()).then(d => {
            if(!d.data){return}
            const images = d.data.children.map((child:any) => {
                let imgUrl = child.data.url
                if(isImgUrl(imgUrl)){
                    console.log(imgUrl)
                    return(imgUrl);
                }
            })
            setImages(images)
        })

    }
    useEffect(() => {
        fetchImagesFromSub(sub)
        setLoaded(true)
    },[sub])
    if(!loaded){
        return <div></div>
    }

    return (
        <div className="flex-2-container">
                <input type="text" onChange={(e) => setSub(e.target.value)}/>
            <div className="images">
                {images.map((imgurl:string) => {
                    return <img className="image" src={imgurl}/>
                })}
            </div>
        </div>
    )
}

export default HomePage