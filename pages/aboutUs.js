import styles from "./AboutUs.module.scss";
import { useSelector } from "react-redux";
import { languageSelector } from "../store/languageSlice";

const AboutUs = () => {
  const curLanguage = useSelector(languageSelector);

  return (
    <div className={styles.about}>

      <h2 className={styles.about__title}>
        {curLanguage === "tt" && "Безнең турында"}
        {curLanguage === "ru" && "O нас"}
        {curLanguage === "tt-lt" && "About us"}
      </h2>
      <div>
        <p>
          {curLanguage === "tt" &&
            "Digitalифрлы китапханәләрнең китапларга, архивларга һәм төрле төрдәге рәсемнәргә җиңел һәм тиз керү чарасы буларак өстенлекләре хәзер коммерция кызыксынулары һәм дәүләт органнары тарафыннан киң таныла."}
          {curLanguage === "ru" &&
            "Преимущества цифровых библиотек как средства легкого и быстрого доступа к книгам, архивам и изображениям различных типов в настоящее время широко признаются как коммерческими кругами, так и государственными органами."}
          {curLanguage === "tt-lt" &&
            "The advantages of digital libraries as a means of easily and rapidly accessing books, archives and images of various types are now widely recognized by commercial interests and public bodies alike."}
        </p>
        <p>
          {curLanguage === "tt" &&
            "Традицион китапханәләр саклау урыны белән чикләнгән; санлы китапханәләр күпкә күбрәк мәгълүмат саклау потенциалына ия, чөнки санлы мәгълүмат аны үз эченә алу өчен бик аз физик урын таләп итә. Шулай итеп, санлы китапханәне тоту бәясе күпкә түбән булырга мөмкин традицион китапханәгә караганда. Физик китапханә үткәрергә тиеш персонал өчен түләү, китап тоту, аренда, һәм өстәмә китаплар. Санлы китапханәләр киметергә яки, кайбер очракларда, бу түләүләрне бетерегез. Ике төр китапханә дә каталог таләп итә кулланучыларга материалны табарга һәм алу өчен кертү. Санлы китапханәләр технологиядә яңалыклар кабул итәргә теләк белдерергә мөмкин кулланучыларга электрон һәм аудио китапны яхшырту белән тәэмин итү кебек технология, шулай ук яңа аралашу формаларын тәкъдим итү викилар һәм блоглар; гадәти китапханәләр тәэмин итүне карарга мөмкин аларның OP AC каталогына онлайн режимда керү җитәрлек. Мөһим санлы конверсиянең өстенлеге - кулланучылар өчен мөмкинлекне арттыру. Алар шулай ук булмаган кешеләр өчен мөмкинлекне арттыралар географик урнашу аркасында китапханәнең традицион меценатлары яки оештыру."}
          {curLanguage === "ru" &&
            "Традиционные библиотеки ограничены местом для хранения; электронные библиотеки могут хранить гораздо больше информации просто потому, что цифровая информация требует очень небольшого физического пространства для ее хранения. Таким образом, стоимость содержания цифровой библиотеки может быть намного ниже. чем в традиционной библиотеке. Физическая библиотека должна тратить большие суммы денег на оплату труда персонала, ведение бухгалтерского учета, аренду и дополнительные книги. Электронные библиотеки могут уменьшить или, в некоторых случаях, откажитесь от этих сборов. Оба типа библиотек требуют каталогизации ввод, чтобы позволить пользователям находить и извлекать материал. Цифровой библиотеки могут быть более склонны к внедрению инноваций в технологии предоставление пользователям улучшений в электронной и аудиокниге технологии, а также представление новых форм коммуникации, таких как вики и блоги; обычные библиотеки могут считать, что предоставление достаточно онлайн-доступа к их каталогу OP AC. Важно Преимуществом цифрового преобразования является повышенная доступность для пользователей. Они также повышают доступность для лиц, которые могут не традиционные покровители библиотеки из-за географического положения или организационная принадлежность."}
          {curLanguage === "tt-lt" &&
            "Traditional libraries are limited by storage space; digital libraries have the potential to store much more information, simply because digital information requires very little physical space to contain it. As such, the cost of maintaining a digital library can be much lower than that of a traditional library. A physical library must spend large sums of money paying for staff, book maintenance, rent, and additional books. Digital libraries may reduce or, in some instances, do away with these fees. Both types of library require cataloging input to allow users to locate and retrieve material. Digital libraries may be more willing to adopt innovations in technology providing users with improvements in electronic and audio book technology as well as presenting new forms of communication such as wikis and blogs; conventional libraries may consider that providing online access to their OP AC catalog is sufficient. An important advantage to digital conversion is increased accessibility to users. They also increase availability to individuals who may not be traditional patrons of a library, due to geographic location or organizational affiliation."}
        </p>
        <ul>
          <li>
            {curLanguage === "tt" &&
              "Физик чик юк: Санлы китапханә кулланучыга барырга кирәк түгел физик яктан китапханәгә; бөтен дөнья кешеләре ала ала бер үк мәгълүматка керү, Интернетка тоташканда бар."}
            {curLanguage === "ru" &&
              "Отсутствие физических границ: пользователю электронной библиотеки не нужно в библиотеку физически; люди со всего мира могут получить доступ к той же информации, пока подключение к Интернету доступный."}
            {curLanguage === "tt-lt" &&
              "No physical boundary: The user of a digital library need not to go to the library physically; people from all over the world can gain access to the same information, as long as an Internet connection is available."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Тәүлек мөмкинлеген түгәрәкләү: Санлы китапханәләрнең төп өстенлеге кешеләр мәгълүматка тәүлек әйләнәсенә керә ала."}
            {curLanguage === "ru" &&
              "Круглосуточная доступность: главное преимущество электронных библиотек заключается в том, что люди могут получить доступ к информации 24/7."}
            {curLanguage === "tt-lt" &&
              "Round the clock availability: A major advantage of digital libraries is that people can gain access 24/7 to the information."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Күп тапкыр керү: бер үк ресурсларны берьюлы кулланырга мөмкин учреждениеләр һәм меценатлар саны. Бу алай булмаска мөмкин авторлык хокукы белән тәэмин ителгән материал: китапханәдә 'кредит бирү' лицензиясе булырга мөмкин. берьюлы бер генә күчермә; бу санлы система ярдәмендә ирешелә ресурслар аннан соң мөмкин булмаган хокуклар белән идарә итү Кредит бирү вакыты бетү яки кредитор сайлаганнан соң ул үтеп булмый (ресурсны кайтаруга тиң)."}
            {curLanguage === "ru" &&
              "Множественный доступ: одни и те же ресурсы могут использоваться одновременно количество учреждений и меценатов. Это может быть не так для материал, защищенный авторским правом: библиотека может иметь лицензию на «выдачу» только одна копия за раз; это достигается с помощью системы цифровых управление правами, когда ресурс может стать недоступным после истечения срока кредита или после того, как кредитор решит сделать он недоступен (эквивалентно возврату ресурса)."}
            {curLanguage === "tt-lt" &&
              "Multiple access: The same resources can be used simultaneously by a number of institutions and patrons. This may not be the case for copyrighted material: a library may have a license for 'lending out' only one copy at a time; this is achieved with a system of digital rights management where a resource can become inaccessible after expiration of the lending period or after the lender chooses to make it inaccessible (equivalent to returning the resource)."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Мәгълүматны алу: Кулланучы теләсә нинди эзләү терминын куллана ала (сүз, сүзтезмә, исем, исем, тема) бөтенесен эзләү коллекция. Санлы китапханәләр кулланучыларга бик уңайлы булырга мөмкин интерфейслары, аның ресурсларына басу мөмкинлеген бирә."}
            {curLanguage === "ru" &&
              "Поиск информации: пользователь может использовать любой поисковый запрос (слово, фраза, заголовок, имя, тема) для поиска по всему коллекция. Цифровые библиотеки могут предоставить очень удобные для пользователя интерфейсы, предоставляя кликабельный доступ к своим ресурсам."}
            {curLanguage === "tt-lt" &&
              "Information retrieval: The user is able to use any search term (word, phrase, title, name, subject) to search the entire collection. Digital libraries can provide very user-friendly interfaces, giving click able access to its resources."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Саклау һәм саклау: цифрлаштыру озак вакытлы түгел физик коллекцияләр өчен саклау чишелеше, ләкин уңышка ирешә Башка материалларга керү копияләрен тәэмин итү кабат кулланудан бозылу. Санлы коллекцияләр һәм туган санлы әйберләр күп саклау һәм саклау аналог материаллар юк дип борчыла. Зинһар, түбәндәгеләрне карагыз Мисаллар өчен бу битнең 'Проблемалар' бүлеге."}
            {curLanguage === "ru" &&
              "Сохранение и сохранение: цифровизация не является долгосрочной решение для сохранения физических коллекций, но успешно предоставление копий для доступа к материалам, которые в противном случае попали бы в деградация от многократного использования. Оцифрованные коллекции и рожденные в цифровом виде объекты представляют собой множество задач по сохранению и сохранению опасения, что аналогов материалов нет. Пожалуйста, смотрите следующее Раздел 'Проблемы' этой страницы для примеров."}
            {curLanguage === "tt-lt" &&
              "Preservation and conservation: Digitization is not a long-term preservation solution for physical collections, but does succeed in providing access copies for materials that would otherwise fall to degradation from repeated use. Digitized collections and born-digital objects pose many preservation and conservation concerns that analog materials do not. Please see the following 'Problems' section of this page for examples."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Космос: традицион китапханәләр саклау урыны белән чикләнгән, санлы китапханәләр күпкә күбрәк мәгълүмат саклый ала, санлы мәгълүмат бик аз физик таләп иткәнгә Аларны урнаштыру өчен урын һәм медиа саклау технологияләре күбрәк элеккегә караганда арзан."}
            {curLanguage === "ru" &&
              "Пространство: в то время как традиционные библиотеки ограничены местом для хранения, цифровые библиотеки могут хранить гораздо больше информации, просто потому, что цифровая информация требует очень мало физических пространство для их хранения и технологии хранения мультимедиа более доступным, чем когда-либо прежде."}
            {curLanguage === "tt-lt" &&
              " Space: Whereas traditional libraries are limited by storage space, digital libraries have the potential to store much more information, simply because digital information requires very little physical space to contain them and media storage technologies are more affordable than ever before."}
          </li>
          <li>
            {curLanguage === "tt" &&
              "Өстәлгән кыйммәт: объектларның кайбер характеристикалары, беренче чиратта, рәсемнәрнең сыйфаты яхшырырга мөмкин. Санлаштыру легитимлыкны арттырырга һәм таплар һәм төссезләнү кебек күренгән кимчелекләрне бетерергә мөмкин."}
            {curLanguage === "ru" &&
              "Добавленная стоимость: некоторые характеристики объектов, в первую очередь качество изображений, могут быть улучшены. Оцифровка может улучшить читаемость и устранить видимые дефекты, такие как пятна и обесцвечивание."}
            {curLanguage === "tt-lt" &&
              "Added value: Certain characteristics of objects, primarily the quality of images, may be improved. Digitization can enhance legibility and remove visible flaws such as stains and discoloration."}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;

