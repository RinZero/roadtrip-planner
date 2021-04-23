import React, { memo } from 'react'

import { Box, withTheme, Typography } from '@material-ui/core'
import styled from 'styled-components'

const ImprintBox = withTheme(styled(Box)`
  padding: ${(props) => props.theme.spacing(3)}px
    ${(props) => props.theme.spacing(3)}px;
  text-align: left;
`)

const ImprintPage = () => {
  return (
    <>
      <ImprintBox>
        <Typography variant="h1">Impressum</Typography>
        <p>
          Informationspflicht laut §5 E-Commerce Gesetz, §14
          Unternehmensgesetzbuch, §63 Gewerbeordnung und Offenlegungspflicht
          laut §25 Mediengesetz.
        </p>
        <p>
          MMP3 Projekt an der FH-Salzburg
          <br />
          Maria Edlinger, Jonathan Lex und Julia Wiesbauer
          <br />
          Urstein Süd 1, 5412 Puch
          <br />
          Österreich
        </p>
        <Typography variant="h3">EU-Streitschlichtung</Typography>
        <p>
          Gemäß Verordnung über Online-Streitbeilegung in
          Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die
          Online-Streitbeilegungsplattform (OS-Plattform) informieren.
          Verbraucher haben die Möglichkeit, Beschwerden an die Online
          Streitbeilegungsplattform der Europäischen Kommission unter{' '}
          <a href="http://ec.europa.eu/odr?tid=121725993">
            http://ec.europa.eu/odr?tid=121725993
          </a>{' '}
          zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in
          unserem Impressum.
        </p>
        <p>
          Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder
          verpflichtet sind, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <Typography variant="h3">Haftung für Inhalte dieser Website</Typography>
        <p>
          Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen
          uns korrekte und aktuelle Informationen bereitzustellen. Leider können
          wir keine Haftung für die Korrektheit aller Inhalte auf dieser Website
          übernehmen, speziell für jene, die seitens Dritter bereitgestellt
          wurden. Als Diensteanbieter sind wir nicht verpflichtet, die von ihnen
          übermittelten oder gespeicherten Informationen zu überwachen oder nach
          Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Unsere Verpflichtungen zur Entfernung von Informationen oder zur
          Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
          aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch
          im Falle unserer Nichtverantwortlichkeit davon unberührt.
        </p>
        <p>
          Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen,
          bitte wir Sie uns umgehend zu kontaktieren, damit wir die
          rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten
          im Impressum.
        </p>
        <Typography variant="h3">
          Haftung für Links auf dieser Webseite
        </Typography>
        <p>
          Unsere Webseite enthält Links zu anderen Webseiten für deren Inhalt
          wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht
          für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten
          und haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen
          sind und wir Links sofort entfernen würden, wenn uns
          Rechtswidrigkeiten bekannt werden.
        </p>
        <p>
          Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitte
          wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.
        </p>
        <Typography variant="h3">Urheberrechtshinweis</Typography>
        <p>
          Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos)
          unterliegen dem Urheberrecht. Bitte fragen Sie uns bevor Sie die
          Inhalte dieser Website verbreiten, vervielfältigen oder verwerten wie
          zum Beispiel auf anderen Websites erneut veröffentlichen. Falls
          notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte
          unserer Seite rechtlich verfolgen.
        </p>
        <p>
          Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht
          verletzen, bitten wir Sie uns zu kontaktieren.
        </p>
        <Typography variant="h3">Bildernachweis</Typography>
        <p>
          Die Bilder, Fotos und Grafiken auf dieser Webseite sind
          urheberrechtlich geschützt.
        </p>
        <Typography variant="h3">Datenschutzerklärung</Typography>
        <Typography variant="h3">Datenschutz</Typography>
        <p>
          Wir haben diese Datenschutzerklärung (Fassung 01.01.1970-121725993)
          verfasst, um Ihnen gemäß der Vorgaben der Datenschutz-Grundverordnung
          (EU) 2016/679 zu erklären, welche Informationen wir sammeln, wie wir
          Daten verwenden und welche Entscheidungsmöglichkeiten Sie als Besucher
          dieser Webseite haben.
        </p>
        <p>
          Datenschutzerklärungen klingen für gewöhnlich sehr technisch. Diese
          Version soll Ihnen hingegen die wichtigsten Dinge so einfach und klar
          wie möglich beschreiben. Soweit es möglich ist, werden technische
          Begriffe leserfreundlich erklärt. Außerdem möchten wir vermitteln,
          dass wir mit dieser Website nur dann Informationen sammeln und
          verwenden, wenn eine entsprechende gesetzliche Grundlage gegeben ist.
          Das ist sicher nicht möglich, wenn man möglichst knappe, technische
          Erklärungen abgibt, so wie sie im Internet oft Standard sind, wenn es
          um Datenschutz geht. Ich hoffe Sie finden die folgenden Erläuterungen
          interessant und informativ und vielleicht ist die eine oder andere
          Information dabei, die Sie noch nicht kannten. Wenn trotzdem Fragen
          bleiben, möchten wir Sie bitten den vorhandenen Links zu folgen und
          sich weitere Informationen auf Drittseiten anzusehen, oder uns einfach
          eine E-Mail zu schreiben. Unsere Kontaktdaten finden Sie im Impressum.
        </p>
        <Typography variant="h3">Automatische Datenspeicherung</Typography>
        <p>
          Wenn Sie heutzutage Websites besuchen, werden gewisse Informationen
          automatisch erstellt und gespeichert, so auch auf dieser Website.
          Diese gesammelten Daten sollten möglichst sparsam und nur mit
          Begründung gesammelt werden werden. Mit Website meinen wir übrigens
          die Gesamtheit aller Webseiten auf Ihrer Domain, d.h. alles von der
          Startseite (Homepage) bis hin zur aller letzten Unterseite (wie dieser
          hier). Mit Domain meinen wir zum Beispiel beispiel.de oder
          musterbeispiel.com.
        </p>
        <p>
          Auch während Sie unsere Website jetzt gerade besuchen, speichert unser
          Webserver – das ist der Computer auf dem diese Webseite gespeichert
          ist – aus Gründen der Betriebssicherheit, zur Erstellung von
          Zugriffsstatistik usw. in der Regel automatisch Daten wie
        </p>
        <ul>
          <li>
            die komplette Internetadresse (URL) der aufgerufenen Webseite (z. B.
            https://www.beispielwebsite.de/beispielunterseite.html/)
          </li>
          <li>Browser und Browserversion (z. B. Chrome 87)</li>
          <li>das verwendete Betriebssystem (z. B. Windows 10)</li>
          <li>
            die Adresse (URL) der zuvor besuchten Seite (Referrer URL) (z. B.
            https://www.beispielquellsite.de/vondabinichgekommen.html/)
          </li>
          <li>
            den Hostname und die IP-Adresse des Geräts von welchem aus
            zugegriffen wird (z. B. COMPUTERNAME und 194.23.43.121)
          </li>
          <li> Datum und Uhrzeit</li>
          <li>in Dateien, den sogenannten Webserver-Logfiles.</li>
        </ul>
        <p>
          In der Regel werden diese Dateien zwei Wochen gespeichert und danach
          automatisch gelöscht. Wir geben diese Daten nicht weiter, können
          jedoch nicht ausschließen, dass diese Daten beim Vorliegen von
          rechtswidrigem Verhalten von Behörden eingesehen werden.
        </p>
        <p>
          Kurz gesagt: Ihr Besuch wird durch unseren Provider (Firma, die unsere
          Website auf speziellen Computern (Servern) laufen lässt),
          protokolliert, aber wir geben Ihre Daten nicht weiter!
        </p>
        <Typography variant="h3">Cookies</Typography>
        <p>
          Unsere Webseite verwendet HTTP-Cookies, um nutzerspezifische Daten zu
          speichern. Im Folgenden erklären wir, was Cookies sind und warum Sie
          genutzt werden, damit Sie die folgende Datenschutzerklärung besser
          verstehen.
        </p>
        <Typography variant="h3">Was genau sind Cookies?</Typography>
        <p>
          Immer wenn Sie durch das Internet surfen, verwenden Sie einen Browser.
          Bekannte Browser sind beispielsweise Chrome, Safari, Firefox, Internet
          Explorer und Microsoft Edge. Die meisten Webseiten speichern kleine
          Text-Dateien in Ihrem Browser. Diese Dateien nennt man Cookies.
        </p>
        <p>
          Eines ist nicht von der Hand zu weisen: Cookies sind echt nützliche
          Helferlein. Fast alle Webseiten verwenden Cookies. Genauer gesprochen
          sind es HTTP-Cookies, da es auch noch andere Cookies für andere
          Anwendungsbereiche gibt. HTTP-Cookies sind kleine Dateien, die von
          unserer Webseite auf Ihrem Computer gespeichert werden. Diese
          Cookie-Dateien werden automatisch im Cookie-Ordner, quasi dem “Hirn”
          Ihres Browsers, untergebracht. Ein Cookie besteht aus einem Namen und
          einem Wert. Bei der Definition eines Cookies müssen zusätzlich ein
          oder mehrere Attribute angegeben werden.
        </p>
        <p>
          Cookies speichern gewisse Nutzerdaten von Ihnen, wie beispielsweise
          Sprache oder persönliche Seiteneinstellungen. Wenn Sie unsere Seite
          wieder aufrufen, übermittelt Ihr Browser die „userbezogenen“
          Informationen an unsere Seite zurück. Dank der Cookies weiß unsere
          Webseite, wer Sie sind und bietet Ihnen die Einstellung, die Sie
          gewohnt sind. In einigen Browsern hat jedes Cookie eine eigene Datei,
          in anderen wie beispielsweise Firefox sind alle Cookies in einer
          einzigen Datei gespeichert.
        </p>
        <p>
          Es gibt sowohl Erstanbieter Cookies als auch Drittanbieter-Cookies.
          Erstanbieter-Cookies werden direkt von unserer Seite erstellt,
          Drittanbieter-Cookies werden von Partner-Webseiten (z.B. Google
          Analytics) erstellt. Jedes Cookie ist individuell zu bewerten, da
          jedes Cookie andere Daten speichert. Auch die Ablaufzeit eines Cookies
          variiert von ein paar Minuten bis hin zu ein paar Jahren. Cookies sind
          keine Software-Programme und enthalten keine Viren, Trojaner oder
          andere „Schädlinge“. Cookies können auch nicht auf Informationen Ihres
          PCs zugreifen.
        </p>
        <Typography variant="h3">Welche Arten von Cookies gibt es?</Typography>
        <p>
          Die Frage welche Cookies wir im Speziellen verwenden, hängt von den
          verwendeten Diensten ab und wird in den folgenden Abschnitten der
          Datenschutzerklärung geklärt. An dieser Stelle möchten wir kurz auf
          die verschiedenen Arten von HTTP-Cookies eingehen.
        </p>
        <p>Man kann 4 Arten von Cookies unterscheiden:</p>
        <p>
          <strong>Unerlässliche Cookies</strong>
          <br />
          Diese Cookies sind nötig, um grundlegende Funktionen der Webseite
          sicherzustellen. Zum Beispiel braucht es diese Cookies, wenn ein User
          ein Produkt in den Warenkorb legt, dann auf anderen Seiten weitersurft
          und später erst zur Kasse geht. Durch diese Cookies wird der Warenkorb
          nicht gelöscht, selbst wenn der User sein Browserfenster schließt.
        </p>
        <p>
          <strong>Zweckmäßige Cookies</strong>
          <br />
          Diese Cookies sammeln Infos über das Userverhalten und ob der User
          etwaige Fehlermeldungen bekommt. Zudem werden mithilfe dieser Cookies
          auch die Ladezeit und das Verhalten der Webseite bei verschiedenen
          Browsern gemessen.
        </p>
        <p>
          <strong>Zielorientierte Cookies</strong>
          <br />
          Diese Cookies sorgen für eine bessere Nutzerfreundlichkeit.
          Beispielsweise werden eingegebene Standorte, Schriftgrößen oder
          Formulardaten gespeichert.
        </p>
        <p>
          <strong>Werbe-Cookies</strong>
          <br />
          Diese Cookies werden auch Targeting-Cookies genannt. Sie dienen dazu
          dem User individuell angepasste Werbung zu liefern. Das kann sehr
          praktisch, aber auch sehr nervig sein.
        </p>
        <p>
          Üblicherweise werden Sie beim erstmaligen Besuch einer Webseite
          gefragt, welche dieser Cookiearten Sie zulassen möchten. Und natürlich
          wird diese Entscheidung auch in einem Cookie gespeichert.
        </p>
        <Typography variant="h3">Wie kann ich Cookies löschen?</Typography>
        <p>
          Wie und ob Sie Cookies verwenden wollen, entscheiden Sie selbst.
          Unabhängig von welchem Service oder welcher Webseite die Cookies
          stammen, haben Sie immer die Möglichkeit Cookies zu löschen, zu
          deaktivieren oder nur teilweise zuzulassen. Zum Beispiel können Sie
          Cookies von Drittanbietern blockieren, aber alle anderen Cookies
          zulassen.
        </p>
        <p>
          Wenn Sie feststellen möchten, welche Cookies in Ihrem Browser
          gespeichert wurden, wenn Sie Cookie-Einstellungen ändern oder löschen
          wollen, können Sie dies in Ihren Browser-Einstellungen finden:
        </p>
        <p>Chrome: Cookies in Chrome löschen, aktivieren und verwalten</p>
        <p>Safari: Verwalten von Cookies und Websitedaten mit Safari</p>
        <p>
          Firefox: Cookies löschen, um Daten zu entfernen, die Websites auf
          Ihrem Computer abgelegt haben
        </p>
        <p>Internet Explorer: Löschen und Verwalten von Cookies</p>
        <p>Microsoft Edge: Löschen und Verwalten von Cookies </p>
        <p>
          Falls Sie grundsätzlich keine Cookies haben wollen, können Sie Ihren
          Browser so einrichten, dass er Sie immer informiert, wenn ein Cookie
          gesetzt werden soll. So können Sie bei jedem einzelnen Cookie
          entscheiden, ob Sie das Cookie erlauben oder nicht. Die Vorgangsweise
          ist je nach Browser verschieden. Am besten Sie suchen die Anleitung in
          Google mit dem Suchbegriff “Cookies löschen Chrome” oder “Cookies
          deaktivieren Chrome” im Falle eines Chrome Browsers.
        </p>
        <Typography variant="h3">
          Wie sieht es mit meinem Datenschutz aus?
        </Typography>
        <p>
          Seit 2009 gibt es die sogenannten „Cookie-Richtlinien“. Darin ist
          festgehalten, dass das Speichern von Cookies eine Einwilligung von
          Ihnen verlangt. Innerhalb der EU-Länder gibt es allerdings noch sehr
          unterschiedliche Reaktionen auf diese Richtlinien. In Österreich
          erfolgte aber die Umsetzung dieser Richtlinie in § 96 Abs. 3 des
          Telekommunikationsgesetzes (TKG). In Deutschland wurden die
          Cookie-Richtlinien nicht als nationales Recht umgesetzt. Stattdessen
          erfolgte die Umsetzung dieser Richtlinie weitgehend in § 15 Abs.3 des
          Telemediengesetzes (TMG).
        </p>
        <p>
          Wenn Sie mehr über Cookies wissen möchten und technische
          Dokumentationen nicht scheuen, empfehlen wir
          https://tools.ietf.org/html/rfc6265, dem Request for Comments der
          Internet Engineering Task Force (IETF) namens “HTTP State Management
          Mechanism”.
        </p>
        <Typography variant="h3">Speicherung persönlicher Daten</Typography>
        <p>
          Persönliche Daten, die Sie uns auf dieser Website elektronisch
          übermitteln, wie zum Beispiel Name, E-Mail-Adresse, Adresse oder
          andere persönlichen Angaben im Rahmen der Übermittlung eines Formulars
          oder Kommentaren im Blog, werden von uns gemeinsam mit dem Zeitpunkt
          und der IP-Adresse nur zum jeweils angegebenen Zweck verwendet, sicher
          verwahrt und nicht an Dritte weitergegeben.
        </p>
        <p>
          Wir nutzen Ihre persönlichen Daten somit nur für die Kommunikation mit
          jenen Besuchern, die Kontakt ausdrücklich wünschen und für die
          Abwicklung der auf dieser Webseite angebotenen Dienstleistungen und
          Produkte. Wir geben Ihre persönlichen Daten ohne Zustimmung nicht
          weiter, können jedoch nicht ausschließen, dass diese Daten beim
          Vorliegen von rechtswidrigem Verhalten eingesehen werden.
        </p>
        <p>
          Wenn Sie uns persönliche Daten per E-Mail schicken – somit abseits
          dieser Webseite – können wir keine sichere Übertragung und den Schutz
          Ihrer Daten garantieren. Wir empfehlen Ihnen, vertrauliche Daten
          niemals unverschlüsselt per E-Mail zu übermitteln.
        </p>
        <Typography variant="h3">
          Rechte laut Datenschutzgrundverordnung
        </Typography>
        <p>
          Ihnen stehen laut den Bestimmungen der DSGVO grundsätzlich die
          folgende Rechte zu:
        </p>
        <ul>
          <li>Recht auf Berichtigung (Artikel 16 DSGVO)</li>
          <li>
            Recht auf Löschung („Recht auf Vergessenwerden“) (Artikel 17 DSGVO)
          </li>
          <li>Recht auf Einschränkung der Verarbeitung (Artikel 18 DSGVO)</li>
          <li>
            Recht auf Benachrichtigung – Mitteilungspflicht im Zusammenhang mit
            der Berichtigung oder Löschung personenbezogener Daten oder der
            Einschränkung der Verarbeitung (Artikel 19 DSGVO)
          </li>
          <li>Recht auf Datenübertragbarkeit (Artikel 20 DSGVO)</li>
          <li>Widerspruchsrecht (Artikel 21 DSGVO)</li>
          <li>
            Recht, nicht einer ausschließlich auf einer automatisierten
            Verarbeitung — einschließlich Profiling — beruhenden Entscheidung
            unterworfen zu werden (Artikel 22 DSGVO)
          </li>
        </ul>
        <p>
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das
          Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche
          sonst in einer Weise verletzt worden sind, können Sie sich bei der
          Aufsichtsbehörde beschweren. Diese ist für Österreich die
          Datenschutzbehörde, deren Webseite Sie unter https://www.dsb.gv.at/
          finden und für Deutschland können Sie sich an die Bundesbeauftragte
          für den Datenschutz und die Informationsfreiheit (BfDI) wenden.
        </p>
        <Typography variant="h3">Auswertung des Besucherverhaltens</Typography>
        <p>
          In der folgenden Datenschutzerklärung informieren wir Sie darüber, ob
          und wie wir Daten Ihres Besuchs dieser Website auswerten. Die
          Auswertung der gesammelten Daten erfolgt in der Regel anonym und wir
          können von Ihrem Verhalten auf dieser Website nicht auf Ihre Person
          schließen.
        </p>
        <p>
          Mehr über Möglichkeiten dieser Auswertung der Besuchsdaten zu
          widersprechen erfahren Sie in der folgenden Datenschutzerklärung.
        </p>
        <Typography variant="h3">TLS-Verschlüsselung mit https</Typography>
        <p>
          TLS, Verschlüsselung und https klingen sehr technisch und sind es
          auch. Wir verwenden HTTPS (das Hypertext Transfer Protocol Secure
          steht für „sicheres Hypertext-Übertragungsprotokoll“) um Daten
          abhörsicher im Internet zu übertragen. Das bedeutet, dass die
          komplette Übertragung aller Daten von Ihrem Browser zu unserem
          Webserver abgesichert ist – niemand kann “mithören”.
        </p>
        <p>
          Damit haben wir eine zusätzliche Sicherheitsschicht eingeführt und
          erfüllen Datenschutz durch Technikgestaltung Artikel 25 Absatz 1
          DSGVO). Durch den Einsatz von TLS (Transport Layer Security), einem
          Verschlüsselungsprotokoll zur sicheren Datenübertragung im Internet
          können wir den Schutz vertraulicher Daten sicherstellen. Sie erkennen
          die Benutzung dieser Absicherung der Datenübertragung am kleinen
          Schlosssymbol links oben im Browser links von der Internetadresse (z.
          B. beispielseite.de) und der Verwendung des Schemas https (anstatt
          http) als Teil unserer Internetadresse. Wenn Sie mehr zum Thema
          Verschlüsselung wissen möchten, empfehlen wir die Google Suche nach
          “Hypertext Transfer Protocol Secure wiki” um gute Links zu
          weiterführenden Informationen zu erhalten.
        </p>
        <Typography variant="h3">HERE Datenschutzerklärung</Typography>
        <p>
          Wir verwenden auf unserer Website das Softwareprogramm HERE WeGo des
          niederländischen Unternehmens HERE Global B.V (Kennedyplein 222 -226,
          5611 ZT Eindhoven, Netherlands). Mit HERE WeGo können geografische
          Daten für Sie visuell dargestellt werden. Wenn Sie den Dienst nutzen,
          werden auch gewisse Daten von Ihnen gespeichert und verarbeitet. In
          dieser Datenschutzerklärung gehen wir näher auf das Tool ein und
          zeigen Ihnen welche Daten wie lange gespeichert und wo verarbeitet
          werden.
        </p>
        <Typography variant="h3">Was ist HERE WeGo?</Typography>
        <p>
          HERE WeGo bietet Funktionen, mit deren Hilfe Sie direkt über unsere
          Website Adressen und Standorte auf einer Karte finden können. Sie
          können mit den angebotenen Services arbeiten. So gibt es
          beispielsweise die Möglichkeit, Ihre eigene Position zu bestimmen oder
          die, von dem Dienst zur Verfügung gestellten, Verkehrsmittel zu
          nutzen. Die Navigation hilft Ihnen den besten Weg zu Ihrem Ziel zu
          finden und wenn Sie wollen können Sie über HERE WeGo auch
          protokollieren, wo sie unterwegs waren und Ihre Standorte in
          Social-Media-Kanälen teilen. Für manche dieser Funktionen müssen Sie
          allerdings ein Konto bei Here WeGo haben.
        </p>
        <Typography variant="h3">
          Warum verwenden wir HERE WeGo auf unserer Website?
        </Typography>
        <p>
          Wir wollen Ihnen mit unserer Website ein umfassendes Service bieten.
          Dazu zählen, aus unserer Sicht, nicht nur unsere themenbezogenen
          Inhalte und Angebote. Auch Funktionen wie HERE WeGo helfen Ihnen
          weiter. Dadurch werden Ihnen Karten und in vielen Fällen dazu passende
          Informationen angezeigt. Weiters können Sie die Routenberechnung oder
          andere Funktionen (wie etwa die Ortssuche) nutzen. Natürlich sehen Sie
          so auch sofort unseren Firmensitz und können die schnellste Route zu
          uns berechnen.
        </p>
        <Typography variant="h3">
          Welche Daten werden von HERE WeGo gespeichert?
        </Typography>
        <p>
          Wir haben Funktionen des Kartendienstes HERE WeGo in unsere Website
          eingebunden, damit Sie die Karten direkt über unsere Website nutzen
          können. Dadurch werden auch personenbezogene Daten wie etwa Ihre
          IP-Adresse übermittelt und gespeichert.
        </p>
        <p>
          Wenn Sie mit den HERE-WeGo-Funktionen (z.B. mit dem Routenplaner)
          interagieren, werden Sie auf die HERE-WeGo-Website weitergeleitet.
          Dort werden auch Cookies in Ihrem Browser gesetzt, um über Ihre
          Handlungen Informationen zu sammeln, zu verarbeiten und zu speichern.
          Nach unserem Erkenntnisstand werden diese Cookies erst gesetzt, wenn
          Sie auf die HERE-WeGo-Website weitergeleitet wurden.
        </p>
        <p>
          Welche Daten genau erfasst werden, hängt natürlich auch sehr stark
          davon ab, wie Sie das Tool verwenden. Hier gehen wir nur auf Daten
          ein, die gespeichert werden, wenn Sie kein HERE-Konto haben bzw. nicht
          angemeldet sind. Neben Ihrer IP-Adresse werden allen voran Daten
          erhoben, die anzeigen, wo Sie sich bzw. Ihr verwendetes Gerät
          befinden. Zusätzlich werden etwa auch technische Daten wie Gerätetyp,
          Ladegeschwindigkeit, Zeitstempel, Netzwerk, WLAN- und Bluetooth-Netze
          in der Umgebung erfasst.
        </p>
        <p>
          Für alle personenbezogenen Daten (wie IP-Adresse) werden zufällige
          Kennungen verwendet, die das Identifizieren Ihrer Person nicht möglich
          machen. Alle nicht-personenbezogenen Daten kann HERE in aggregierter
          Form uneingeschränkt verwenden und auch weitergeben.
        </p>
        <p>
          Wie oben bereits erwähnt nutzt HERE WeGo auch Cookies, um Daten zu
          speichern. Dabei wird Ihr Gerät identifiziert, wenn Sie die
          HERE-Website besuchen. Es werden im Namen des Unternehmens auch
          Cookies von Drittanbietern gesetzt, um auch Analysedienste in Anspruch
          zu nehmen. Entsprechend unserer Tests passiert das allerdings erst
          direkt auf der HERE-Website.
        </p>
        <Typography variant="h3">
          Wie lange und wo werden die Daten gespeichert?
        </Typography>
        <p>
          HERE versucht grundsätzlich nur die personenbezogenen Daten zu erheben
          und zu speichern, die für den Zweck des Dienstes erforderlich sind.
          Und diese Daten werden auch so lange gespeichert, wie es für den Zweck
          nötig ist. Die Speicherdauer hängt auch von der Art der
          personenbezogenen Daten ab. Daten zu Ihrer Useraktivität mit HERE WeGo
          werden im Normalfall nur kurz aufbewahrt und dann anonymisiert oder
          pseudonymisiert. Genaue Zeitangaben werden nicht bekannt gegeben. Die
          Informationen werden in den Servern von HERE in den Niederlanden
          gespeichert.
        </p>
        <Typography variant="h3">
          Wie kann ich meine Daten löschen bzw. die Datenspeicherung verhindern?
        </Typography>
        <p>
          Sie haben jederzeit das Recht auf Auskunft über Ihre personenbezogenen
          Daten, das Recht auf Löschung personenbezogenen Daten und Sie haben
          auch das Recht, der Verarbeitung unter bestimmten Umständen zu
          widersprechen.
        </p>
        <p>
          Werden Sie auf die Here-Website weitergeleitet, werden auch definitiv
          Cookies gesetzt. In Ihrem Browser können Sie einzelne Cookies
          deaktivieren, löschen oder verwalten.
        </p>
        <p>
          Wir hoffen, wir haben Ihnen die wichtigsten Informationen über die
          Datenspeicherung und Datenverarbeitung durch HERE WeGo nähergebracht.
          Weiterführende und noch genauere Informationen finden Sie direkt auf
          der HERE-Website unter{' '}
          <a href="https://legal.here.com/de-de/privacy/policy">
            https://legal.here.com/de-de/privacy/policy
          </a>
          und unter{' '}
          <a href="https://legal.here.com/de-de/privacy/here-wego-here-application-or-here-maps-privacy-supplement-updated">
            https://legal.here.com/de-de/privacy/here-wego-here-application-or-here-maps-privacy-supplement-updated
          </a>
          .
          <Typography variant="h3">
            Amazon-Partnerprogramm Datenschutzerklärung
          </Typography>
          <p>
            Wir verwenden auf unserer Website das Amazon-Partnerprogramm des
            Unternehmens Amazon.com, Inc. Die verantwortlichen Stellen im Sinne
            der Datenschutzerklärung sind die Amazon Europe Core S.à.r.l., die
            Amazon EU S.à.r.l, die Amazon Services Europe S.à.r.l. und die
            Amazon Media EU S.à.r.l., alle vier ansässig 5, Rue Plaetis, L-2338
            Luxemburg sowie Amazon Instant Video Germany GmbH, Domagkstr. 28,
            80807 München. Als Datenverarbeiter wird die Amazon Deutschland
            Services GmbH, Marcel-Breuer-Str. 12, 80807 München, tätig. Durch
            die Verwendung dieses Amazon-Partnerprogramms können Daten von Ihnen
            an Amazon übertragen, gespeichert und verarbeitet werden.
          </p>
          <p>
            In dieser Datenschutzerklärung informieren wir Sie um welche Daten
            es sich handelt, warum wir das Programm verwenden und wie Sie die
            Datenübertragung verwalten bzw. unterbinden können.
          </p>
          <Typography variant="h3">
            Was ist das Amazon-Partnerprogramm?
          </Typography>
          <p>
            Das Amazon-Partnerprogramm ist ein Affiliate-Marketing-Programm des
            Online-Versandunternehmens Amazon.de. Wie jedes Affiliate-Programm
            basiert auch das Amazon-Partnerprogramm auf dem Prinzip der
            Vermittlungsprovision. Amazon bzw. wir platzieren auf unserer
            Website Werbung oder Partnerlinks und wenn Sie darauf klicken und
            ein Produkt über Amazon kaufen, erhalten wir eine
            Werbekostenerstattung (Provision).
          </p>
          <Typography variant="h3">
            Warum verwenden wir das Amazon-Partnerprogramm auf unserer Webseite?
          </Typography>
          <p>
            Unser Ziel ist es Ihnen eine angenehme Zeit mit vielen hilfreichen
            Inhalten zu liefern. Dafür stecken wir sehr viel Arbeit und Energie
            in die Entwicklung unserer Website. Mit Hilfe des
            Amazon-Partnerprogramms haben wir die Möglichkeit, für unsere Arbeit
            auch ein bisschen entlohnt zu werden. Jeder Partnerlink zu Amazon
            hat selbstverständlich immer mit unserem Thema zu tun und zeigt
            Angebote, die Sie interessieren könnten.
          </p>
          <Typography variant="h3">
            Welche Daten werden durch das Amazon-Partnerprogramm gespeichert?
          </Typography>
          <p>
            Sobald Sie mit den Produkten und Dienstleistungen von Amazon
            interagieren, erhebt Amazon Daten von Ihnen. Amazon unterscheidet
            zwischen Informationen, die Sie aktiv dem Unternehmen geben und
            Informationen, die automatisch gesammelt und gespeichert werden. Zu
            den “aktiven Informationen” zählen zum Beispiel Name,
            E-Mail-Adresse, Telefonnummer, Alter, Zahlungsinformationen oder
            Standortinformationen. Sogenannte „automatische Informationen“
            werden in erster Linie über Cookies gespeichert. Dazu zählen
            Informationen zum Userverhalten, IP-Adresse, Gerätinformationen
            (Browsertyp, Standort, Betriebssysteme) oder die URL. Amazon
            speichert weiters auch den Clickstream. Damit ist der Weg
            (Reihenfolge der Seiten) gemeint, den Sie als User zurücklegen, um
            zu einem Produkt zu kommen. Auch um die Herkunft einer Bestellung
            nachvollziehen zu können, speichert Amazon Cookies in Ihrem Browser.
            So erkennt das Unternehmen, dass Sie über unsere Website eine
            Amazon-Werbeanzeige oder einen Partnerlink angeklickt haben.
          </p>
          <p>
            Wenn Sie ein Amazon-Konto haben und angemeldet sind, während Sie auf
            unserer Webseite surfen, können die erhobenen Daten Ihrem Account
            zugewiesen werden. Das verhindern Sie, indem Sie sich bei Amazon
            abmelden, bevor Sie auf unserer Website surfen.
          </p>
          <p>
            Amazon nutzt diese erhaltenen Informationen, um Werbeanzeigen
            genauer an die Interessen der User abzustimmen.
          </p>
          <Typography variant="h3">
            Wie lange und wo werden die Daten gespeichert?
          </Typography>
          <p>
            Persönliche Daten werden von Amazon so lange gespeichert, wie es für
            die geschäftlichen Dienste von Amazon erforderlich ist oder aus
            rechtlichen Gründen notwendig ist. Da das Unternehmen Amazon seinen
            Hauptsitz in den USA hat, werden die gesammelten Daten auch auf
            amerikanischen Servern gespeichert.
          </p>
          <Typography variant="h3">
            Wie kann ich meine Daten löschen bzw. die Datenspeicherung
            verhindern?
          </Typography>
          <p>
            Sie haben jederzeit das Recht auf Ihre personenbezogenen Daten
            zuzugreifen und sie auch zu löschen. Wenn Sie einen Amazon-Account
            besitzen, können Sie in Ihrem Account viele der erhobenen Daten
            verwalten oder löschen.
          </p>
          <p>
            Eine weitere Option, die Datenverarbeitung und -speicherung durch
            Amazon nach Ihren Vorlieben zu verwalten, bietet Ihr Browser. Dort
            können Sie Cookies verwalten, deaktivieren oder löschen.
          </p>
          <p>
            Bitte beachten Sie, dass bei der Verwendung dieses Tools Daten von
            Ihnen auch außerhalb der EU gespeichert und verarbeitet werden
            können. Die meisten Drittstaaten (darunter auch die USA) gelten nach
            derzeitigem europäischen Datenschutzrecht als nicht sicher. Daten an
            unsichere Drittstaaten dürfen also nicht einfach übertragen, dort
            gespeichert und verarbeitet werden, sofern es keine passenden
            Garantien (wie etwa EU-Standardvertragsklauseln) zwischen uns und
            dem außereuropäischen Dienstleister gibt.
          </p>
          <p>
            Wir hoffen wir haben Ihnen die wichtigsten Informationen über die
            Datenübertragung durch die Verwendung von dem Amazon-Partnerprogramm
            nähergebracht. Mehr Informationen finden Sie unter{' '}
            <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010">
              https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010
            </a>
            . Alle Texte sind urheberrechtlich geschützt.
          </p>
          Quelle: Erstellt mit dem Datenschutz Generator von AdSimple{' '}
        </p>
      </ImprintBox>
    </>
  )
}

export default memo(ImprintPage)
