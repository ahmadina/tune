import fs from 'fs';
import slugify from 'slugify';
import junk from 'junk';
import uid from 'uid';

class Walker {
    artist(folder) {
        const fileContents = fs.readdirSync(folder).filter(junk.not);
        const fileTree = [];
        let stats;

        fileContents.forEach((fileName) => {
            stats = fs.lstatSync(`${folder}/${fileName}`);

            if (stats.isDirectory()) {
                fileTree.push({
                    _id: uid(10),
                    url: slugify(fileName.toLowerCase()),
                    full_name: fileName,
                    cover: `${fileName}/cover.jpg`,
                    dir: `${folder}/${fileName}`,
                    temp_albums: fs.readdirSync(`${folder}/${fileName}/Albums`).filter(junk.not),
                });
            }
        });

        return fileTree;
    }

    music(artists, callback) {
        artists.forEach((artist) => {
            artist.albums = [];
            artist.temp_albums.forEach((album) => {
                artist.albums.push({
                    _id: uid(10),
                    url: slugify(album.toLowerCase()),
                    title: album,
                    cover: `${artist.full_name}/Albums/${album}/cover.jpg`,
                    dir: `${artist.dir}/Albums/${album}`,
                    tracks: fs.readdirSync(`${artist.dir}/Albums/${album}`).filter((item) => {
                        return item !== junk.not && item.indexOf('mp3') > -1;
                    }),
                });
            });

            artist.temp_albums = undefined;
        });

        callback(artists);
    }
}

export default Walker;
