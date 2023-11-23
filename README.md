[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DRfJgED0)
# KU Hackathon 2023 
<p align="center">
<img width="96px" src="https://s3.tech.nisit.ku.ac.th/assets/ku-hackathon/main-logo.webp" />
</p>

รายละเอียดโครงการ : https://docs.google.com/document/d/1bn_71K9RF_K8MaBbZNgUAtS7PgFJkon91lOat7AtFxw/edit


คำสั่ง git พื้นฐานในการอัปโหลดโค้ดขึ้นมาที่ repository นี้

```bash
git add .
git commit -m "<commit_message>"
git push -u origin main
```

<h2>Feature Name: KU Assistant</h2>

**รายชื่อสมาชิก**

    1.นายณฐพล พลนาการ 6410500220 
    2.นายวรกร โฆษิตโภคิน 6410500327  
    3.นายพชรพล ราชสภา 6410501099
    4.นายชนาธิป พูลสวัสดิ์ 6510602229
คำอธิบาย: ฟีเจอร์สำหรับตอบคำถามหรือข้อของสงสัยของนิสิต KU ในด้านต่างๆ ทั้งในด้านการเรียน ความปลอดภัย หรือ ช่องทางการติดต่ของหน่วยงานต่างๆ เป็นต้น โดยตัวฟีเจอร์จะเป็น Chatgpt-based web application คือการนำ api ของopenai มาใช้กับข้อมูลในม.เกษตรของเรานั่นเอง
**ภาพตัวอย่าง**

<img width="256px" src="https://cdn.discordapp.com/attachments/1174247634396004397/1177226741115260958/image.png?ex=6571bcd6&is=655f47d6&hm=280f26d1221a356ee050aa666aeab9401993db4862253d73dd5088f890b715a2&">

หน้าล็อกอิน ทำการล็อกอินด้วย Nontri Account(ในตอนdemo จะใช้ mock data) 

<img width="256px" src="https://cdn.discordapp.com/attachments/1174247634396004397/1177225455103909928/image.png?ex=6571bba4&is=655f46a4&hm=11628599e21ccd7e9941e237b376fd467cfb77db830a38ddf4a5d010f77423cf&">

หน้าเลือกฟีเจอร์ กดเข้าไปที่ KU Assistant

<img width="256px" src="https://cdn.discordapp.com/attachments/1174247634396004397/1177225618912448632/image.png?ex=6571bbcb&is=655f46cb&hm=a98a6af0f49273a635b9b9787663c174adaf5cdc78089851fa3f60ec87f42867&">

หน้าหลักของ KU assistant สามารถถามคำถามที่ต้องการได้โดยใช้แถบป้อนmessage ด้านล่าง โดยเมื่อกดไปที่ไอคอนนาฬิกาด้านขวาบน จะเข้าไปที่หน้าhistory ดังรูปด้านล่าง

<img width="256px" src="https://cdn.discordapp.com/attachments/1174247634396004397/1177225737854521444/image.png?ex=6571bbe7&is=655f46e7&hm=7c0827ab89e706a27f02f69f6bd18f30b6888c8756c1a9eae2302fc89f46caf5&">

สามารถเลือกหัวข้อที่เคยถามไปแล้วได้โดยการกดไปที่ข้อความ

**Figma Link:** 
https://www.figma.com/community/file/1309505216727004951/ku-assistant