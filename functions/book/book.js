const path = require("path")
const PDFDocument = require("pdfkit")
const Jimp = require("jimp")
const { Base64Encode } = require("base64-stream")
const { request } = require("graphql-request")

const cloudinary = require("./utils/cloudinary")
const glitch = require("./utils/glitch")

const bookQuery = `{
    content: sheetpoem(
      spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg"
      range: "A1:A1000"
      verses: 200
    )
    title: sheetpoem(
      spreadsheetId: "16bLauoyWcJy6aevXTagkHHnlgW2KZufXhHocVQ92qOg"
      range: "C1:E1000"
      verses: 1
    )
}`

const getBookData = async () => {
  const data = await request(
    `${process.env.URL}/.netlify/functions/graphql`,
    bookQuery
  )
  return data
}

const getCleanImage = () => {
  const clean = new Promise(resolve => {
    cloudinary.list("clean/", images => {
      const bookCover = images[Math.floor(Math.random() * images.length)]
      resolve(bookCover.secure_url)
    })
  })
  return clean
}

const glitchCover = async title => {
  const cleanUrl = await getCleanImage()
  const cleanImg = await Jimp.read(cleanUrl)

  const font = await Jimp.loadFont(path.join(__dirname, "fonts/org_01.fnt"))

  const textWidth = Jimp.measureText(font, title)

  const glitched = await glitch(cleanUrl)
  const resized = await glitched.resize(textWidth / 2, Jimp.AUTO) // resize to textWidth and scale height accordingly

  const w = resized.bitmap.width
  const h = resized.bitmap.height

  const withText = resized.print(
    font,
    32,
    0,
    {
      text: title,
      alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    w - 32,
    h
  )
  const buffer = await withText.getBufferAsync(Jimp.AUTO)

  return buffer
}

const getPDFStream = async () => {
  const doc = new PDFDocument({
    size: [480, 640],
  })

  // write to PDF
  const bookData = await getBookData()
  const bookCover = await glitchCover(bookData.title)

  doc.rect(0, 0, 480, 640).fill("black")

  // Add an image, constrain it to a given size, and center it vertically and horizontally
  doc.image(bookCover, 20, 20, {
    fit: [440, 600],
    align: "center",
    valign: "center",
  })

  const tH = doc
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(18)
    .heightOfString(bookData.title)

  doc
    .addPage()
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(18)
    .text(bookData.title, 72, 320 - tH / 2)
    .font(path.join(__dirname, "fonts/NixieOne.ttf"))
    .fontSize(16)
    .text("Cumatron", 72, 320 - tH / 2 + tH, {
      align: "left",
    })

  doc
    .addPage()
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(12)
    .text("Prólogo\n\n", { align: "center" })
    .font(path.join(__dirname, "fonts/NixieOne.ttf"))
    .fontSize(16)
    .text(
      "Ignoramos si Alan Turing leyó alguna vez poesía, aunque sospechamos que su genio creativo poco y nada tiene que envidiarle a la imaginación de nuestros más grandes poetas. Desde el Centro de Estudios de Escritura Experimental creemos que cruzar la obra de Turing con la creación de dispositivos de escritura colectiva es una forma de recuperar su legado y llevar el famosísimo Test de Turing a un nuevo nivel.\n\nEn su ensayo de 1950, “Computing Machinery and Intelligence”, el inglés anota: “Nos gusta creer que el hombre es sutilmente superior al resto de la creación. Es mejor si se puede demostrar que es necesariamente superior, ya que entonces no hay peligro de que pierda su posición de mando”. Ese mismo argumento, que Turing –oh, sorpresa!—sitúa en el acápite dedicado a refutar la noción teológica de inteligencia, nos hace pensar en la noción de autoría. En la noción de creatividad. En el genio creativo de acuerdo al romanticismo.\n\nY aunque Barthes y Foucault hayan comandado el cortejo fúnebre del Autor, su cadáver –la estela que ha dejado su putrefacción—nos sigue inundando las fosas nasales con su nauseabundo y pestilente perfume cadavérico. Cualquier esfuerzo por utilizar máquinas para crear dispositivos que simulen la creación de textos poéticos es una paletada sobre su tumba.\n\nCumatron funciona, en este sentido, como una tecnología que tensiona las nociones de creatividad y autoría. ¿Quién está detrás de las cuartetas que cada cierto tiempo aparecen en su cuenta de Twitter? Si el azar de un código puede crear sentido o sin-sentido –y en esto este bot juega en varias escuelas poéticas, desde aquella de corte más narrativa y confesional hasta la poesía del lenguaje--, entonces cualquier cosa es posible. Y eso nos gusta.\n\nPor otra parte, están las posibilidades ficcionales que los versos del bot traen. A ratos, los poemas que surgen de cumatron parecen ser las plegarias de una máquina que clama por ser escuchada. En otros, una voz apocalíptica anuncia el fin de los tiempos. Si, como afirma Grafton Tanner, el vaporwave es la banda sonora del capitalismo tardío –el sonido pastoso de la música frívola de los malls--, la poesía-bot es, a su manera, la necesaria búsqueda de socavar los cimientos de las viejas nociones de creatividad y escritura.\n\nPuede que sea el momento que, como en la vieja Grecia de Homero, el poema consuetudinario y colectivo recupere el estatus que nunca debió perder contra los figurines de colección, alias autores.\n\nQue las máquinas nos ayuden. \n\nKajetia, Georgia, diciembre de 2020.",
      {
        align: "justify",
      }
    )

  const formatDate = date => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    const time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    return day + " " + monthNames[monthIndex] + " " + year + " " + time
  }

  const date = formatDate(new Date())

  const dH = doc
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(24)
    .heightOfString(date)

  doc
    .addPage()
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(12)
    .text(date, 72, 320 - dH / 2, {
      align: "right",
    })

  // Add a page every 4 verses
  const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
    }, [])
  }

  const pages = chunk(bookData.content.split("\n"), 4)

  pages.forEach((page, index) => {
    const pageText = page.join("\n")
    const pageTextHeight = doc
      .font(path.join(__dirname, "fonts/NixieOne.ttf")) // <- COOL FOR TEXT
      .fontSize(18)
      .heightOfString(pageText)

    // const isOdd = num => {
    //   return num % 2;
    // };

    doc
      .addPage()
      .font(path.join(__dirname, "fonts/NixieOne.ttf")) // <- COOL FOR TEXT
      .fontSize(18)
      .text(pageText, 72, 320 - pageTextHeight / 2, { align: "left" })
      .font(path.join(__dirname, "fonts/org_01.ttf")) // <- COOL FOR TEXT
      .fontSize(12)
      // .text(title, 36, 36, {
      //   align: isOdd(index + 1) ? "left" : "right"
      // })
      .text((1 + index++).toString(2).padStart(8, "0"), 72, 550, {
        align: "center",
      })
  })

  doc.addPage()

  const finalText = "Connection reset by peer."

  const fH = doc
    .font(path.join(__dirname, "fonts/NixieOne.ttf"))
    .fontSize(18)
    .heightOfString(finalText)

  doc
    .addPage()
    .font(path.join(__dirname, "fonts/NixieOne.ttf"))
    .fontSize(18)
    .text(finalText, 72, 320 - fH / 2, {
      align: "center",
    })

  doc
    .addPage()
    .rect(0, 0, 480, 640)
    .fill("black")

  doc.image(path.join(__dirname, "icon.png"), 0, 400, {
    fit: [480, 96],
    align: "center",
    valign: "center",
  })

  doc
    .font(path.join(__dirname, "fonts/org_01.ttf"))
    .fontSize(12)
    .fillColor("white")
    .text(`@CUMATRON_WIN`, 72, 500, {
      align: "center",
    })

  doc.end()

  let finalString = "" // contains the base64 string
  const stream = doc.pipe(new Base64Encode())

  stream.on("data", function(chunk) {
    finalString += chunk
  })

  return new Promise((resolve, reject) => {
    stream.on("end", () => resolve(finalString))
    stream.on("error", reject)
  })
}

exports.handler = async (event, context, callback) => {
  try {
    const pdfStream = await getPDFStream()
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-type": "application/pdf",
        "accept-ranges": "bytes",
      },
      body: pdfStream,
    }
  } catch (error) {
    console.log(error)
  }
}
