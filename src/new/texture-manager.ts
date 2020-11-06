class TextureManager {
  cache: {
    [key: string]: PIXI.Texture;
  } = {};

  loadTexture(name: string, path: string) {
    if (!(name in this.cache)) {
      this.cache[name] = PIXI.Texture.from(path);
    }
    return this.cache[name];
  }

  getTexture(name: string) {
    return this.cache[name];
  }
}

const textureManager = new TextureManager();
export default textureManager;
