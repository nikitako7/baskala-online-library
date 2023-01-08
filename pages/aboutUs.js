import styles from "./AboutUs.module.scss";
import { useSelector } from "react-redux";
import { languageSelector } from "../store/languageSlice";

const AboutUs = () => {
  const curLanguage = useSelector(languageSelector);

  return (
    <div className={styles.about}>

      <h2 className={styles.about__title}>
        {curLanguage === "tt" && "Бу автор турында"}
        {curLanguage === "ru" && "Об авторе"}
        {curLanguage === "tt-lt" && "Bu avtor turında"}
      </h2>
      <div>
        <p className={styles.mail}>
          {curLanguage === "tt" &&
            "Başqala проекты — ул онлайн татар әдәбияты китапханәсе. Сайтта татар язычуларының да шагыйренең әдәби әсәрләре җыелган һәм татар теленә тәрҗемә ителгән бөтендөнья әдәбияты классикасы шулай ук. Başqala белән милли мәдәнияткә чумып алыгыз әле! Bashqala татар классикасы белән иң югары кешеләр саны җентекләп таныштыруы максатны куя. Шуның өстенә, кешеләргә милли әдәбиятенә мәхәббәт тәрбияләсебез килә һәм татарча сөйләшә торган кешеләргә хәзерге татар әдәбияте туган телендә укырга мөмкинлек бирәсебез килә. Сайтта унтугызынчы, көмеш гасыры һәм совет чоры каты танылган язычуларның әсәрләрен табарсыз. Габдулла Тукай, Гадел Кутуй, Муса Җәлил, Хәсән Туфан, Сәгыйть Рәмиев кебек авторларының ике телдә — русча һәм татарча үтәрлек әсәрләре. Авторлык хокукы бәйләгән эшләр буенча проблемаларыгыз булса, почтага хат языгыз: "}
          {curLanguage === "ru" &&
            "Проект Başqala - это онлайн библиотека татарской литературы. На сайте собраны произведения татарских писателей и поэтов, а также классика мировой литературы, переведенная на татарский язык. Başqala ставит целью ознакомление максимального количества людей с татарской классикой. Кроме того, мы хотим привить людям любовь к национальной литературе и позволить татароязычным людям читать современную литературу на татарском языке. На сайте вы найдете произведения именитых авторов 19 столетия, Серебряного века и советской эпохи. Произведения таких авторов, как Габдулла Тукай, Адель Кутуй, Муса Джалиль, Хасан Туфан, Сагит Рамиев, доступны на двух языках - татарском и русском. Если у вас есть вопросы по работе сайта или претензии, связанные с авторскими правами, пожалуйста, напишите нам на почту: "}
          {curLanguage === "tt-lt" &&
            "Başqala” proyektı — ul onlayn tatar ädäbiyatı kitapxanäse. Saytta tatar yazıçularınıñ da şağireneñ ädäbi äsärläre cıyılğan häm tatar telenä tärcemä itelgän bötendönya ädäbiyatı klassikası şulay uq. “Başqala” belän milli mädäniyätkä çumıp alığız äle! “Başqala” tatar klassikası belän iñ yuğarı keşelär sanı centekläp tanıştıruwı maqsatnı quya. Şunıñ östenä, keşelärgä milli ädäbiyatına mäxäbbät tärbiyäläsebez kilä häm Tatarça söyläşä torğan keşelärgä xäzerge tatar ädäbiyatı tuğan telendä uqırğa mömkinlek biräsebez kilä. Saytta untuğızınçı, kömeş ğasırı häm sovet çorı qatı tanılğan yazıçularnıñ äsärlären tabarsız. Ğabdulla Tuqay, Ğadel Qutuy, Musa Cälil, Xäsän Tufan, Säğit Rämiyev kebek avtorlarınıñ ike teldä — Rusça häm Tatarça ütärlek äsärläre. Avtorlıq xoquqı bäylägän eşlär buyınça problemalarığız bulsa, poçtağa xat yazığız: "}
        </p>  
        <a href="mailto:baskala.online.library@gmail.com">baskala.online.library@gmail.com</a>
      </div>
    </div>
  );
};

export default AboutUs;
