export default function Page() {
  return (
    <>
      <picture className="bl_bg">
        <source
          srcSet="/wp8338140-jackson-pollock-desktop-wallpapers-small.jpg"
          media="(max-width: 960px)"
        />
        <img
          src="/wp8338140-jackson-pollock-desktop-wallpapers.jpg"
          alt="Jackson Pollock Desktop Wallpaper"
          className="w-full h-auto bl_bg_image"
        />
      </picture>
      {/* <>SP用の要素入れる</> */}
    </>
  );
}
