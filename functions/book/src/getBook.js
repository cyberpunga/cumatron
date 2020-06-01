const path = require("path")
const PDFDocument = require("pdfkit")

const getBookData = require("./getBookData")
const getRandomImage = require("./getRandomImage")

const { g11x, pasteText } = require("cumatronize")

const moment = require("moment")
moment.updateLocale("es", require("moment/locale/es"))

const getBook = async () => {
  const randomImg = await getRandomImage()
  const g11xed = await g11x(randomImg)
  const { title, content } = await getBookData()
  const m3m3 = await pasteText(g11xed, title)

  const [pageWidth, pageHeight] = [480, 640]
  const [marginX, marginY] = [20, 20]
  const bodyFontSize = 16
  const notesFontSize = 8
  const [textMarginX, textMarginY] = [72, 36]

  const getVerticalHalf = (font, fontSize, text) => {
    return (
      pageHeight / 2 -
      doc
        .font(path.join(__dirname, font))
        .fontSize(fontSize)
        .heightOfString(text) /
        2
    )
  }

  const doc = new PDFDocument({
    size: [pageWidth, pageHeight],
  })

  // Cover
  doc
    .image(path.join(__dirname, "../images/pattern.png"), 0, 0)
    .image(m3m3, marginX, marginY, {
      fit: [pageWidth - marginX * 2, pageHeight - marginY * 2],
      align: "center",
      valign: "center",
    })

  // Title page
  doc
    .addPage()
    .font(path.join(__dirname, "../fonts/Orgv01.woff"))
    .fontSize(bodyFontSize)
    .text(
      title,
      textMarginX,
      getVerticalHalf("../fonts/Orgv01.woff", bodyFontSize, title)
    )

  // Prologue
  doc
    .addPage()
    .font(path.join(__dirname, "../fonts/Orgv01.woff"))
    .fontSize(bodyFontSize)
    .text("Prólogo\n\n", { align: "center" })
    .font(path.join(__dirname, "../fonts/raleway-latin-200.woff"))
    .fontSize(bodyFontSize)
    .text(
      "Ignoramos si Alan Turing leyó alguna vez poesía, aunque sospechamos que su genio creativo poco y nada tiene que envidiarle a la imaginación de nuestros más grandes poetas. Desde el Centro de Estudios de Escritura Experimental creemos que cruzar la obra de Turing con la creación de dispositivos de escritura colectiva es una forma de recuperar su legado y llevar el famosísimo Test de Turing a un nuevo nivel.\n\nEn su ensayo de 1950, “Computing Machinery and Intelligence”, el inglés anota: “Nos gusta creer que el hombre es sutilmente superior al resto de la creación. Es mejor si se puede demostrar que es necesariamente superior, ya que entonces no hay peligro de que pierda su posición de mando”. Ese mismo argumento, que Turing –oh, sorpresa!—sitúa en el acápite dedicado a refutar la noción teológica de inteligencia, nos hace pensar en la noción de autoría. En la noción de creatividad. En el genio creativo de acuerdo al romanticismo.\n\nY aunque Barthes y Foucault hayan comandado el cortejo fúnebre del Autor, su cadáver –la estela que ha dejado su putrefacción—nos sigue inundando las fosas nasales con su nauseabundo y pestilente perfume cadavérico. Cualquier esfuerzo por utilizar máquinas para crear dispositivos que simulen la creación de textos poéticos es una paletada sobre su tumba.\n\nCumatron funciona, en este sentido, como una tecnología que tensiona las nociones de creatividad y autoría. ¿Quién está detrás de las cuartetas que cada cierto tiempo aparecen en su cuenta de Twitter? Si el azar de un código puede crear sentido o sin-sentido –y en esto este bot juega en varias escuelas poéticas, desde aquella de corte más narrativa y confesional hasta la poesía del lenguaje--, entonces cualquier cosa es posible. Y eso nos gusta.\n\nPor otra parte, están las posibilidades ficcionales que los versos del bot traen. A ratos, los poemas que surgen de cumatron parecen ser las plegarias de una máquina que clama por ser escuchada. En otros, una voz apocalíptica anuncia el fin de los tiempos. Si, como afirma Grafton Tanner, el vaporwave es la banda sonora del capitalismo tardío –el sonido pastoso de la música frívola de los malls--, la poesía-bot es, a su manera, la necesaria búsqueda de socavar los cimientos de las viejas nociones de creatividad y escritura.\n\nPuede que sea el momento que, como en la vieja Grecia de Homero, el poema consuetudinario y colectivo recupere el estatus que nunca debió perder contra los figurines de colección, alias autores.\n\nQue las máquinas nos ayuden. \n\nKajetia, Georgia, " +
        moment().format("LL") +
        ".",
      {
        align: "justify",
      }
    )

  // Add a page every 4 verses
  const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
    }, [])
  }

  const pages = chunk(content.split("\n"), 4)

  pages.forEach((page, index) => {
    const pageText = page.join("\n")

    const isOdd = num => {
      return num % 2
    }

    doc
      .addPage()
      .font(path.join(__dirname, "../fonts/raleway-latin-200.woff"))
      .fontSize(bodyFontSize)
      .text(
        pageText,
        textMarginX,
        getVerticalHalf(
          "../fonts/raleway-latin-200.woff",
          bodyFontSize,
          pageText
        ),
        { align: "left" }
      )
      .font(path.join(__dirname, "../fonts/raleway-latin-200.woff"))
      .fontSize(notesFontSize)
      .text(
        isOdd(index + 1) ? title : "cumatron.win",
        textMarginX,
        textMarginY,
        {
          align: isOdd(index + 1) ? "left" : "right",
        }
      )
      .text((1 + index++).toString(2).padStart(8, "0"), textMarginX, 550, {
        align: "center",
      })
  })

  doc
    .addPage()
    .font(path.join(__dirname, "../fonts/raleway-latin-200.woff"))
    .fontSize(bodyFontSize)
    .text(
      "Final de archivo.",
      textMarginX,
      getVerticalHalf(
        "../fonts/raleway-latin-200.woff",
        bodyFontSize,
        "Final de archivo."
      ),
      { align: "center" }
    )

  doc
    .addPage()
    .image(path.join(__dirname, "../images/pattern.png"), 0, 0)
    .image(path.join(__dirname, "../images/icon.png"), 0, 400, {
      fit: [480, 96],
      align: "center",
      valign: "center",
    })
    .font(path.join(__dirname, "../fonts/Orgv01.woff"))
    .fontSize(12)
    .fillColor("#eeeeee")
    .text(`@CUMATRON_WIN`, textMarginX, 500, {
      align: "center",
    })

  doc.end()

  // let finalString = ""
  // const stream = doc.pipe(new Base64Encode())
  // stream.on("data", function(chunk) {
  //   finalString += chunk
  // })
  // return new Promise((resolve, reject) => {
  //   stream.on("end", () => resolve(finalString))
  //   stream.on("error", reject)
  // })

  const buffers = []
  doc.on("data", buffers.push.bind(buffers))
  return new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers).toString("base64")))
    doc.on("error", reject)
  })
}

module.exports = getBook
