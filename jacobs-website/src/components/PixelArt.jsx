const imageList = ['img1.jpg', 'img2.png'];

export default function ImageGallery() {
  return (
    <div>
      {imageList.map((filename) => (
        <img
          key={filename}
          src={`/images/${filename}`}
          alt={filename}
          style={{ width: '150px' }}
        />
      ))}
    </div>
  );
}

export default function PixelArt(){
    return(
<div>

</div>
    )
}

