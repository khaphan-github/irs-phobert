import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class HomePage {
  query = '';
  results: {
    title: string;
    content: string;
    author: string;
    wordcount: number;
    tags: string[];
    id: number;
    publication: number;
    updatetime: number;
  }[] = [];
  showNoResult = false;
  constructor() { }
  removeVietnameseTones(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }
  search() {
    const keyword = this.query.trim().toLowerCase();

    if (keyword) {
      // Simulated search results
      this.results = [
        {
          id: 502101,
          title: "U23 Việt Nam đánh bại Thái Lan ở chung kết SEA Games",
          author: "user_849320",
          wordcount: 712,
          updatetime: 1718575600,
          publication: 1718575200,
          tags: ["U23", "SEA Games", "bóng đá", "Việt Nam", "Thái Lan"],
          content: `Trong trận chung kết SEA Games 32, U23 Việt Nam đã xuất sắc đánh bại U23 Thái Lan với tỉ số 2-0. Các bàn thắng được ghi bởi Nguyễn Văn Tùng và Khuất Văn Khang. Trận đấu diễn ra đầy căng thẳng với nhiều pha bóng đẹp mắt. Chiến thắng này giúp U23 Việt Nam bảo vệ thành công HCV SEA Games lần thứ hai liên tiếp.`
        },
        {
          id: 502102,
          title: "Cristiano Ronaldo lập hat-trick ở giải Saudi Pro League",
          author: "cr7_news_bot",
          wordcount: 540,
          updatetime: 1718600000,
          publication: 1718599000,
          tags: ["Ronaldo", "bóng đá quốc tế", "Al-Nassr", "Saudi Pro League"],
          content: `Trong trận đấu giữa Al-Nassr và Al-Ettifaq, Cristiano Ronaldo đã tỏa sáng với một cú hat-trick, giúp đội nhà giành chiến thắng 4-1. Đây là hat-trick thứ 65 trong sự nghiệp của CR7. Anh chia sẻ sau trận: "Tôi cảm thấy sung sức và hào hứng với hành trình mới cùng Al-Nassr."`
        },
        {
          id: 502103,
          title: "Tuyển nữ Việt Nam vào tứ kết Asian Cup",
          author: "vff_official",
          wordcount: 635,
          updatetime: 1718612000,
          publication: 1718611500,
          tags: ["bóng đá nữ", "Asian Cup", "Việt Nam", "Thái Lan", "tứ kết"],
          content: `Sau khi vượt qua Thái Lan với tỉ số 2-1 ở vòng bảng, tuyển nữ Việt Nam đã chính thức giành quyền vào tứ kết Asian Cup 2025. Các bàn thắng được ghi bởi Huỳnh Như và Tuyết Dung. HLV Mai Đức Chung bày tỏ sự hài lòng và kỳ vọng sẽ tiến sâu hơn tại giải lần này.`
        },
        {
          id: 502104,
          title: "Lý Hoàng Nam giành chức vô địch quần vợt ITF",
          author: "tennisvn_2024",
          wordcount: 480,
          updatetime: 1718608000,
          publication: 1718607600,
          tags: ["quần vợt", "Lý Hoàng Nam", "ITF", "Việt Nam", "vô địch"],
          content: `Tay vợt số một Việt Nam, Lý Hoàng Nam, đã đánh bại đối thủ người Nhật Bản trong trận chung kết ITF Men’s Futures với tỉ số 6-4, 7-5. Đây là danh hiệu ITF thứ 8 trong sự nghiệp của anh. Anh chia sẻ: "Chiến thắng này là bước đệm cho những mục tiêu lớn hơn ở cấp ATP."`
        },
        {
          id: 502105,
          title: "Đội tuyển bóng chuyền nữ Việt Nam thắng áp đảo Indonesia",
          author: "sport247",
          wordcount: 510,
          updatetime: 1718599000,
          publication: 1718598000,
          tags: ["bóng chuyền", "đội tuyển nữ", "SEA Games", "Việt Nam", "Indonesia"],
          content: `Tại bán kết SEA Games 32, đội tuyển bóng chuyền nữ Việt Nam giành chiến thắng thuyết phục 3-0 trước Indonesia với các set điểm 25-17, 25-14 và 25-21. Lê Thanh Thúy và Trần Thị Thanh Thúy là hai nhân tố nổi bật, giúp đội tuyển vào chung kết gặp Thái Lan.`
        }
      ];

      const removeVN = this.removeVietnameseTones;
      if (keyword) {
        this.results = this.results.filter(data => {
          return removeVN(data.title.toLowerCase()).includes(removeVN(keyword)) ||
            removeVN(data.content.toLowerCase()).includes(removeVN(keyword)) ||
            data.tags.some(tag => removeVN(tag.toLowerCase()).includes(removeVN(keyword)));
        });
        this.showNoResult = this.results.length === 0;
      } else {
        this.results = [];
        this.showNoResult = true;
      }

    } else {
      this.results = [];
      this.showNoResult = true;
    }
  }

}
