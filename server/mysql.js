const mysql = require('mysql2/promise');

module.exports = class Mysql {
    static #instance;
    constructor() {
        if (Mysql.#instance) return Mysql.#instance;
        this.SCHEMAS = { 'stays': 'stays(img, title, lat, lng, type, guest, bed, bath, rating, price)' }
        this.#init();
        Mysql.#instance = this;
    }

    #init() {
        this.pool = mysql.createPool({
            host: process.env.HOST || "localhost",
            user: 'root',
            password: process.env.MYSQL_PWD || null,
            database: 'my_airbnb',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })
    }

    //pool.query()는 getConnection(), query, release() 포함
    select = async (query) => {
        const [rows, fields] = await this.pool.query(query)
        return rows
    }

    selectAll = async (tableName) => {
        const query = `select * from ${tableName}`
        return await this.select(query)
    }

    selectInMapBounds = async (tableName, ne_lat, ne_lng, sw_lat, sw_lng) => {
        const query = `select * from ${tableName} WHERE 
        (lat BETWEEN ${sw_lat} AND ${ne_lat}) AND (lng BETWEEN ${sw_lng} AND ${ne_lng})`
        return await this.select(query)
    }

    insert = async (tableName, ...values) => {
        const tableSchema = this.SCHEMAS[tableName]
        const query = `INSERT INTO ${tableSchema} VALUES (?)`
        const [rows] = await this.pool.query(query, values)
        console.log(rows)
        return [rows]
    }
}

// const createDummy = (db) => {
//     // image from google search
//     const IMAGES = [
//         'https://photo.jtbc.joins.com/news/2019/06/05/20190605181614181.jpg',
//         'https://a.cdn-hotels.com/gdcs/production100/d843/b8208e9f-aaa3-4985-b3d2-59f80e2ade7b.jpg',
//         'https://t1.daumcdn.net/cfile/tistory/2604E6435185EF083C',
//         'https://a.cdn-hotels.com/gdcs/production110/d1295/985557b1-8062-4894-9a32-0d2bc8ae0e7b.jpg',
//         'https://mblogthumb-phinf.pstatic.net/20160711_189/interios_1468231049711yXBBC_PNG/image_9841741061468230941887.png?type=w800',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXWXIMmXYtIDDRSSGGIhzpgaLXW5FJ-htMQ&usqp=CAU',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLHXapnoRw4n4dnsT-4ly7fNcXPhZ0IMuDg&usqp=CAU',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_WxiNkcWrYW1gWBDnF3oNGyOLcQhSp5-aQ&usqp=CAU',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR44QJn6EwE6vh0wvXLYQn5mpiGQk1Ae6Hbqw&usqp=CAU',
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR44QJn6EwE6vh0wvXLYQn5mpiGQk1Ae6Hbqw&usqp=CAU',
//     ]
//     const TITLE = ["최고의 숙소", "친구집", "우리집", "형아집", "짱좋은 숙소", "엄청 좋은 숙소"]
//     const TYPE = ["호텔", "빌라", "아파트", "펜션", "민박"]
//     const stays = []

//     stays.concat(Array(10000).fill(0).forEach(v => {
//         const lat = Math.random() > 0.5 ? 37.3645704 + 0.1 * Math.random() : 37.3645704 - 0.1 * Math.random()
//         const lng = Math.random() > 0.5 ? 127.110399 + 0.1 * Math.random() : 127.110399 - 0.1 * Math.random()
//         stays.push({
//             img: IMAGES[Math.floor(9 * Math.random())], title: TITLE[Math.floor(6 * Math.random())],
//             lat: lat, lng: lng, type: TYPE[Math.floor(5 * Math.random())], guest: parseInt(8 * Math.random()), bed: parseInt(8 * Math.random()), bath: parseInt(8 * Math.random()), rating: (5 * Math.random()).toFixed(2), price: parseInt(700 * Math.random()) * 1000
//         })
//     }))
//     stays.forEach(v => db.insert('stays', Object.values(v)))
// }