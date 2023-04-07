import { useEffect, useState } from "react"
import './HomePage.css'
function HomePage(){
    const baseUrl = 'https://api.reddit.com/r/'
    const urlSuffix = '.json'
    const [images, setImages] = useState<string[]>([])
    const [loaded, setLoaded] = useState(false)
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
        fetchImagesFromSub('cute')
        setLoaded(true)
    },[])
    if(!loaded){
        return <div></div>
    }

    return (
        <div className="images">
            {images.map((imgurl:string) => {
                return <img className="image" src={imgurl}/>
            })}
        </div>
    )
}

export default HomePage