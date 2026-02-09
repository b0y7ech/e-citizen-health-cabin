# **Kiến trúc và Tiêu chuẩn Thiết kế Hệ thống Kiosk Y tế Thông minh: Hướng dẫn Kỹ thuật Toàn diện cho Phát triển UI/UX**

Sự phát triển mạnh mẽ của công nghệ trí tuệ nhân tạo (AI) và Internet vạn vật (IoT) đã thúc đẩy một sự chuyển dịch mang tính bước ngoặt trong lĩnh vực chăm sóc sức khỏe, từ các mô hình giao dịch truyền thống sang các hệ sinh thái cabin sức khỏe thông minh tích hợp.1 Những cabin này không còn đơn thuần là các trạm thông tin tĩnh mà đã trở thành những "không gian sống thứ ba", nơi tích hợp khả năng nhận thức, phân tích, ra quyết định và can thiệp y tế trực tiếp.1 Đối với các nhà phát triển và thiết kế giao diện, thách thức cốt lõi nằm ở việc tạo ra một tài liệu thiết kế màn hình đủ chi tiết và trực quan để làm cầu nối giữa các yêu cầu y tế phức tạp và trải nghiệm người dùng cuối cùng một cách mượt mà nhất. Tài liệu này không chỉ phục vụ cho việc lập trình mà còn phải đảm bảo tính nhất quán về thương hiệu, độ tin cậy về bảo mật và khả năng tiếp cận tối đa cho mọi đối tượng người dùng.2

## **1\. Tâm lý học Người dùng và Quản lý Tải nhận thức trong Môi trường Y tế**

Trong bối cảnh y tế, người dùng thường tiếp cận các hệ thống tự phục vụ trong trạng thái lo âu, đau đớn hoặc căng thẳng nhận thức cao. Do đó, nguyên tắc quan trọng nhất trong thiết kế UI/UX cho kiosk y tế là sự đơn giản và rõ ràng tuyệt đối.2 Một tài liệu thiết kế màn hình chuyên nghiệp phải xác định rõ các luồng công việc tuyến tính, giúp người dùng hoàn thành nhiệm vụ mà không cần sự hỗ trợ của con người.3

Sự "đứt gãy về sự thấu hiểu" (Empathy Gap) thường xảy ra khi các nhà thiết kế quá tập trung vào chức năng kỹ thuật mà bỏ quên nhu cầu cảm xúc và thể chất của bệnh nhân.4 Để khắc phục điều này, giao diện cần được xây dựng trên nền tảng các bước thực hiện ngắn gọn, có chỉ dẫn rõ ràng cho từng trạng thái tiếp theo.3 Việc sử dụng các chỉ báo tiến trình (progress indicators) và các yếu tố điều hướng như nút "Tiếp theo" (Next) và "Quay lại" (Back) là bắt buộc để tạo ra sự kiểm soát và giảm bớt sự mơ hồ cho người dùng.3

| Nguyên tắc Thiết kế | Mô tả Kỹ thuật | Tác động đến Trải nghiệm |
| :---- | :---- | :---- |
| Sự Đơn giản (Simplicity) | Một nhiệm vụ chính trên mỗi màn hình; loại bỏ các yếu tố gây xao nhãng. | Giảm tải nhận thức và tỷ lệ bỏ dở giao dịch.2 |
| Cấu trúc Phân cấp Thị giác | Sử dụng kích thước, màu sắc và vị trí để làm nổi bật các yếu tố quan trọng. | Hướng dẫn sự chú ý của người dùng vào hành động ưu tiên.3 |
| Phản hồi Tức thì | Cung cấp tín hiệu thị giác hoặc âm thanh ngay khi người dùng tương tác. | Củng cố sự tự tin rằng hệ thống đang hoạt động đúng.3 |
| Ngôn ngữ Phẳng (Plain Language) | Sử dụng thuật ngữ không mang tính chuyên môn; biểu tượng đi kèm nhãn văn bản. | Đảm bảo người dùng ở mọi trình độ văn hóa đều có thể sử dụng.2 |

## **2\. Công thái học Vật lý và Tiêu chuẩn ADA cho Hệ thống Kiosk**

Thiết kế màn hình cho kiosk không thể tách rời khỏi bối cảnh vật lý của phần cứng. Nhà phát triển cần hiểu rõ các giới hạn về tầm với và góc nhìn để tối ưu hóa vị trí của các thành phần tương tác trên màn hình.2 Các tiêu chuẩn như Đạo luật Người khuyết tật Hoa Kỳ (ADA) cung cấp các thông số kỹ thuật nghiêm ngặt về chiều cao của các phần có thể vận hành, đảm bảo rằng người dùng ngồi xe lăn hoặc có tầm vóc thấp vẫn có thể tiếp cận hệ thống một cách thoải mái.7

Phạm vi tiếp cận thông thường cho các bộ phận tương tác như màn hình cảm ứng, đầu đọc thẻ và bàn phím vật lý phải nằm trong khoảng từ 15 đến 48 inch so với sàn nhà.6 Nếu kiosk có vật cản phía trước, chiều cao tối đa của các thành phần tương tác phải được điều chỉnh xuống còn 44 inch để đảm bảo khả năng với tới.8 Ngoài ra, không gian sàn trống tối thiểu là 30 x 48 inch phải được duy trì phía trước kiosk để cho phép người dùng xe lăn xoay xở và tiếp cận trực diện hoặc từ bên cạnh.6

Đối với thiết kế giao diện trên các màn hình lớn (thường trên 60 inch), các nhà phát triển nên tập trung các yếu tố tương tác vào phần ba giữa của màn hình để tránh việc người dùng phải vươn người quá mức hoặc cúi thấp.3 Một điểm đáng lưu ý là khoảng 90% người dùng thuận tay phải, do đó các nút điều hướng quan trọng nên được ưu tiên đặt ở phía bên phải màn hình để tăng tính thuận tiện.3

## **3\. Khả năng Tiếp cận Kỹ thuật số và Thiết kế Hòa nhập (Inclusive Design)**

Khả năng tiếp cận không chỉ dừng lại ở phần cứng mà còn phải được tích hợp sâu vào mã nguồn và thiết kế đồ họa. Các nhà phát triển phải tuân thủ hướng dẫn WCAG 2.1 để đảm bảo người dùng khiếm thị, khiếm thính hoặc có khó khăn về nhận thức đều có thể sử dụng kiosk một cách độc lập.10

Độ tương phản màu sắc đóng vai trò sống còn trong việc đảm bảo tính dễ đọc. Tỷ lệ tương phản tối thiểu cho văn bản bình thường là 4.5:1 và 3:1 cho văn bản lớn theo tiêu chuẩn AA.11 Trong môi trường y tế, việc nâng cao tiêu chuẩn lên mức AAA với tỷ lệ 7:1 cho văn bản bình thường là một khuyến nghị thông minh để hỗ trợ những người cao tuổi có thị lực kém.11

Công thức tính độ sáng tương đối (![][image1]) được sử dụng trong các thuật toán kiểm tra tự động như sau:

![][image2]  
Tỷ lệ tương phản được tính bằng công thức:

![][image3]  
Trong đó ![][image4] là độ sáng của màu sáng hơn và ![][image5] là độ sáng của màu tối hơn.11

Kiến trúc thông tin trên màn hình nên sử dụng phông chữ không chân (sans-serif) như Arial, Roboto hoặc Lexend để tối ưu hóa khả năng hiển thị trên màn hình kỹ thuật số.3 Kích thước chữ phải đủ lớn để có thể đọc được từ khoảng cách từ 2 đến 3 feet đối với người đang sử dụng kiosk, và thậm chí lớn hơn nếu nội dung cần được nhìn thấy từ xa.2

| Khoảng cách Đọc | Kích thước Chữ Khuyến nghị | Bối cảnh Sử dụng |
| :---- | :---- | :---- |
| Tại chỗ (2-3 feet) | 12 \- 18 pt | Nhập liệu thông tin cá nhân.2 |
| 6 feet | 30 pt | Chỉ dẫn hướng dẫn cơ bản.13 |
| 10 feet | 48 pt | Tiêu đề hoặc thông báo trạng thái.13 |
| 12 feet | 60 pt | Biển báo kỹ thuật số thu hút người dùng.13 |

## **4\. Tương tác Đa phương thức và Công nghệ AI Tác nhân**

Sự trỗi dậy của AI đã mở ra các phương thức tương tác mới vượt xa màn hình cảm ứng truyền thống. Các hệ thống kiosk hiện đại tích hợp nhận diện khuôn mặt, xử lý ngôn ngữ tự nhiên (NLP) và cảm biến sinh trắc học để tạo ra trải nghiệm cá nhân hóa và không tiếp xúc.1

Công nghệ AI cho phép thực hiện các quy trình kiểm tra sức khỏe chỉ bằng cách quét khuôn mặt trong 30 giây, từ đó phân tích các chỉ số như nhịp tim, huyết áp và biến thiên nhịp tim mà không cần thiết bị đeo.16 Đối với nhà phát triển, điều này yêu cầu tích hợp các luồng xử lý video thời gian thực trực tiếp trên thiết bị để đảm bảo tính riêng tư và giảm độ trễ.16

Sử dụng Nhân vật Đại diện AI (AI Avatars) là một xu hướng mạnh mẽ giúp nhân bản hóa các tương tác tự phục vụ. Những trợ lý kỹ thuật số này không chỉ có khả năng nói và nghe mà còn có thể nhận diện cảm xúc của người dùng thông qua biểu cảm khuôn mặt và giọng điệu, từ đó điều chỉnh cách phản ứng một cách đồng cảm.15 Điều này đặc biệt có giá trị trong việc hướng dẫn bệnh nhân thực hiện các quy trình phức tạp như sàng lọc triệu chứng hoặc đăng ký nhập viện.18

Giao diện cho các hệ thống hỗ trợ avatar cần cân bằng giữa cửa sổ xem video camera (để người dùng thấy chính mình trong quá trình quét) và hình ảnh đại diện của AI. Sự hiện diện của một nhân vật có khả năng giao tiếp bằng mắt và cử chỉ tự nhiên giúp giảm bớt căng thẳng và tạo dựng lòng tin cho bệnh nhân.17

## **5\. Quy trình Phát triển với Nền tảng Google Antigravity**

Trong kỷ nguyên mới của phát triển phần mềm, các công cụ như Google Antigravity đang tái định nghĩa cách thức các nhà phát triển xây dựng và kiểm thử hệ thống kiosk. Antigravity không chỉ là một trình soạn thảo mã nguồn mà là một nền tảng phát triển dựa trên tác nhân (agentic development platform), cho phép các tác nhân AI tự chủ lập kế hoạch, thực thi và xác thực các nhiệm vụ kỹ thuật phức tạp.22

Đối với việc thiết kế UI/UX cho kiosk y tế, Antigravity cho phép nhà phát triển:

* **Tạo mẫu nhanh (Rapid Prototyping)**: Các tác nhân có thể chuyển đổi các mô tả bằng ngôn ngữ tự nhiên hoặc bản vẽ phác thảo thành các thành phần giao diện chức năng trong vài phút.22  
* **Kiểm thử Tự động với Trình duyệt Subagent**: Các tác nhân có thể tự động chạy các bài kiểm tra giao diện, ghi lại video quá trình tương tác và xác thực các yêu cầu chức năng mà không cần sự can thiệp thủ công của con người.22  
* **Quản lý Tri thức Kỹ thuật**: Hệ thống có khả năng lưu trữ và truy xuất các kiến trúc hoặc đoạn mã tối ưu từ các dự án trước đó, giúp duy trì tính nhất quán cho các hệ thống kiosk quy mô lớn.26

Sử dụng mô hình "Quản lý Tác nhân" (Agent Manager), nhà phát triển có thể phân phối các nhiệm vụ như xây dựng logic backend, triển khai UI, gỡ lỗi và tối ưu hóa bảo mật cho các tác nhân làm việc song song, từ đó rút ngắn đáng kể chu kỳ phát triển.26

## **6\. Kiến trúc Máy trạng thái cho Luồng Tương tác Kiosk**

Để đảm bảo tính ổn định và logic cho giao diện người dùng, việc áp dụng mô hình Máy Trạng thái Hữu hạn (Finite State Machine \- FSM) là một phương pháp tối ưu. Mô hình này giúp định nghĩa rõ ràng các trạng thái thị giác của ứng dụng và các sự kiện kích hoạt quá trình chuyển đổi giữa chúng.29

Một quy trình check-in y tế điển hình có thể được mô hình hóa qua các trạng thái sau:

1. **Trạng thái Trống (Empty)**: Màn hình chờ hiển thị nội dung thu hút, khuyến khích người dùng bắt đầu.3  
2. **Trạng thái Nhập liệu (Typing/Input)**: Hiển thị các trường thông tin hoặc lựa chọn dịch vụ.29  
3. **Trạng thái Xử lý (Submitting/Processing)**: Vô hiệu hóa các tương tác, hiển thị biểu tượng tải (spinner) hoặc thông báo AI đang phân tích.29  
4. **Trạng thái Thành công (Success)**: Hiển thị thông báo hoàn tất và chỉ dẫn các bước tiếp theo trong thế giới thực.3  
5. **Trạng thái Lỗi (Error)**: Cung cấp thông báo lỗi bằng ngôn ngữ dễ hiểu và hướng dẫn cách khắc phục.29

Việc sử dụng các công cụ lập trình trực quan hoặc mã nguồn định nghĩa trạng thái giúp các nhà phát triển dễ dàng bảo trì và mở rộng hệ thống mà không làm phức tạp hóa các câu lệnh điều kiện lồng nhau.30

## **7\. Đồng bộ hóa Text-to-Speech (TTS) và Hiển thị Văn bản**

Đối với các kiosk y tế hỗ trợ người khiếm thị hoặc người có khó khăn về đọc, việc đồng bộ hóa âm thanh TTS với nội dung hiển thị trên màn hình là một yêu cầu kỹ thuật quan trọng. Tính năng "đọc đến đâu làm nổi bật đến đó" (follow-along highlighting) giúp tạo ra trải nghiệm đọc phong phú và dễ tiếp cận hơn.33

Nhà phát triển cần triển khai các bước kỹ thuật sau để đạt được sự đồng bộ hóa:

* **Xử lý Luồng Âm thanh (Audio Streaming)**: Sử dụng các thư viện như Picovoice Orca để chuyển đổi văn bản thành dữ liệu PCM theo thời gian thực.35  
* **Quản lý Bộ nhớ đệm và Luồng (Threading)**: Việc tổng hợp giọng nói nên diễn ra trên một luồng riêng biệt với luồng phát âm thanh để đảm bảo phản hồi tức thì và không làm đứng giao diện.35  
* **Trích xuất Siêu dữ liệu Căn chỉnh (Alignment Metadata)**: Các công cụ TTS hiện đại cung cấp thông tin về thời điểm bắt đầu và kết thúc của từng từ hoặc âm vị (startSec, endSec).35  
* **Cập nhật Giao diện theo Thời gian thực**: Sử dụng các khung thời gian này để kích hoạt việc thay đổi màu sắc hoặc kiểu dáng của từ tương ứng trên màn hình thông qua các trình kết xuất chuyên dụng (như NcNarratorFollowAlongRenderer trong Vue/Nuxt).33

## **8\. Bảo mật Dữ liệu và Quyền riêng tư của Bệnh nhân**

Trong lĩnh vực y tế, bảo mật thông tin cá nhân (PII) và thông tin sức khỏe (PHI) là ưu tiên hàng đầu. Kiosk phải được thiết kế để bảo vệ quyền riêng tư ngay cả trong môi trường công cộng.2

Các biện pháp thiết kế và kỹ thuật cần được tích hợp bao gồm:

* **Quản lý Phiên làm việc Nghiêm ngặt**: Tự động đăng xuất và xóa sạch dữ liệu người dùng ngay sau khi kết thúc phiên hoặc sau một khoảng thời gian không hoạt động.2  
* **Bảo mật Vật lý và Thị giác**: Sử dụng màn hình góc nhìn hẹp hoặc tấm phim chống nhìn trộm để ngăn chặn việc người đứng cạnh quan sát được thông tin nhạy cảm.2  
* **Mã hóa và Tuân thủ Quy định**: Đảm bảo toàn bộ dữ liệu truyền đi giữa kiosk và hệ thống hồ sơ điện tử (EHR) được mã hóa mạnh mẽ và tuân thủ các đạo luật như HIPAA hoặc GDPR.5  
* **Thông báo Bảo mật Thân thiện**: Thay vì các thông báo kỹ thuật khô khan, hãy sử dụng các câu lệnh trấn an người dùng như "Phiên làm việc của bạn sẽ được thiết lập lại để bảo vệ quyền riêng tư".2

## **9\. Quy trình Nghiên cứu và Kiểm thử Người dùng**

Một tài liệu thiết kế màn hình chỉ thực sự hiệu quả khi nó dựa trên dữ liệu thực tế từ người dùng. Việc kiểm thử phải được thực hiện với các nhóm đối tượng đa dạng, bao gồm cả những người khuyết tật, người cao tuổi và những người có kỹ năng số hạn chế.2

Các nhà phát triển nên tham gia vào quá trình quan sát người dùng tương tác với các bản mẫu (prototypes) ngay tại môi trường thực tế như bệnh viện hoặc phòng khám. Điều này giúp phát hiện ra những vấn đề mà các giả định thiết kế ban đầu có thể bỏ sót, chẳng hạn như việc nhân viên y tế bỏ qua hệ thống tự động vì nó quá chậm trong giờ cao điểm.37 Các chỉ số đo lường sự tin tưởng của người dùng thông qua khảo sát và đánh giá phiên làm việc thường quan trọng hơn cả số lượng lượt nhấp chuột trong bối cảnh chăm sóc sức khỏe.39

## **10\. Tầm nhìn Tương lai và Kết luận**

Kiosk y tế đang tiến hóa từ các công cụ giao dịch đơn giản thành các đối tác chăm sóc sức khỏe thông minh. Tương lai sẽ chứng kiến sự tích hợp sâu hơn của AI cảm xúc, các màn hình 3D thực tế ảo tăng cường để hướng dẫn đường đi trong bệnh viện, và khả năng xử lý biên mạnh mẽ giúp bảo mật dữ liệu tuyệt đối.1

Đối với các nhà phát triển, việc tạo ra một tài liệu thiết kế màn hình phù hợp đòi hỏi sự kết hợp nhuần nhuyễn giữa kiến thức về công thái học vật lý, tiêu chuẩn tiếp cận kỹ thuật số và các công cụ phát triển hiện đại như AI tác nhân. Bằng cách tập trung vào sự thấu cảm, tính minh bạch và độ tin cậy, chúng ta không chỉ xây dựng được những giao diện hiệu quả mà còn đóng góp vào việc cải thiện kết quả sức khỏe cho cộng đồng. Sự thành công của một dự án kiosk y tế không chỉ nằm ở việc dòng mã chạy đúng, mà ở việc mỗi bệnh nhân đều cảm thấy được hỗ trợ và tôn trọng khi tương tác với công nghệ.2

#### **Works cited**

1. AI-Driven Smart Cockpit: Monitoring of Sudden Illnesses, Health Risk Intervention, and Future Prospects \- PMC, accessed February 9, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12787685/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12787685/)  
2. How User-Friendly Is the Kiosk Interface for Users? \- Kiosk Industry, accessed February 9, 2026, [https://kioskindustry.org/kiosk-ux-ui-how-to-design-checklist/](https://kioskindustry.org/kiosk-ux-ui-how-to-design-checklist/)  
3. User Interface Design for Kiosks \- Frank Mayer and Associates, Inc., accessed February 9, 2026, [https://www.frankmayer.com/blog/user-interface-design-for-kiosks/](https://www.frankmayer.com/blog/user-interface-design-for-kiosks/)  
4. Common Challenges in UX Design of Self-Service Kiosks \- Wavetec, accessed February 9, 2026, [https://www.wavetec.com/blog/challenges-in-ux-design-of-self-service-kiosks/](https://www.wavetec.com/blog/challenges-in-ux-design-of-self-service-kiosks/)  
5. Industry Considerations: How to Make an Accessible Kiosk \- TPGi \- Vispero, accessed February 9, 2026, [https://vispero.com/resources/considerations-for-making-an-accessible-kiosk/](https://vispero.com/resources/considerations-for-making-an-accessible-kiosk/)  
6. Beyond the Touchscreen: Your Guide to Kiosk Accessibility, accessed February 9, 2026, [https://www.accessibilitychecker.org/blog/kiosk-accessibility/](https://www.accessibilitychecker.org/blog/kiosk-accessibility/)  
7. 4 Rules to Follow for Usable & Accessible Healthcare Kiosks \- Vispero, accessed February 9, 2026, [https://vispero.com/resources/4-rules-to-follow-for-usable-accessible-healthcare-kiosks/](https://vispero.com/resources/4-rules-to-follow-for-usable-accessible-healthcare-kiosks/)  
8. Designing ADA-Compliant Kiosks: A Practical Guide to Accessibility Standards \- ShiMeta, accessed February 9, 2026, [https://shimetadevice.com/ada-compliant-kiosk-accessibility-guide/](https://shimetadevice.com/ada-compliant-kiosk-accessibility-guide/)  
9. Making Self-Service Work for Everyone: A Guide to Kiosk Accessibility, accessed February 9, 2026, [https://rtgpos.com/news/making-self-service-work-for-everyone-a-guide-to-kiosk-accessibility/](https://rtgpos.com/news/making-self-service-work-for-everyone-a-guide-to-kiosk-accessibility/)  
10. ADA Kiosk Accessibility \- Vispero, accessed February 9, 2026, [https://vispero.com/resources/ada-kiosk/](https://vispero.com/resources/ada-kiosk/)  
11. Accessibility | Color & Type \- UCLA Brand Guidelines, accessed February 9, 2026, [https://brand.ucla.edu/fundamentals/accessibility/color-type](https://brand.ucla.edu/fundamentals/accessibility/color-type)  
12. Colors and Typography: Optimizing for Accessibility \- Aguayo, accessed February 9, 2026, [https://aguayo.co/en/blog-aguayo-user-experience/color-and-typography/](https://aguayo.co/en/blog-aguayo-user-experience/color-and-typography/)  
13. Creating accessible design with color and type \- Wayne State University, accessed February 9, 2026, [https://medcom.med.wayne.edu/creating-accessible-design](https://medcom.med.wayne.edu/creating-accessible-design)  
14. AI Smart Cockpits: Driving Innovation, Navigating Security Risks \- VicOne, accessed February 9, 2026, [https://cdn.vicone.com/archives/vicone/white-paper/ai-smart-cockpits.pdf](https://cdn.vicone.com/archives/vicone/white-paper/ai-smart-cockpits.pdf)  
15. How AI Avatars Are Changing Self-Service Kiosks \- Wavetec, accessed February 9, 2026, [https://www.wavetec.com/blog/self-service/ai-avatars-in-self-service-kiosks/](https://www.wavetec.com/blog/self-service/ai-avatars-in-self-service-kiosks/)  
16. Shen AI: Camera-based health screenings, accessed February 9, 2026, [https://shen.ai/](https://shen.ai/)  
17. Taking Interactive Kiosks to the Next Level with AI Avatars \- Convai, accessed February 9, 2026, [https://home.convai.com/blog/interactive-ai-kiosks-with-ai-avatars](https://home.convai.com/blog/interactive-ai-kiosks-with-ai-avatars)  
18. How to Develop an AI Avatar for Clinical Management \- Biz4Group LLC, accessed February 9, 2026, [https://www.biz4group.com/blog/develop-ai-avatar-for-clinical-management](https://www.biz4group.com/blog/develop-ai-avatar-for-clinical-management)  
19. AI Avatar Kiosks for Hospitals \- Rife Medical Furniture, accessed February 9, 2026, [https://rifemedical.in/pages/ai-avatar-kiosks-for-hospitals](https://rifemedical.in/pages/ai-avatar-kiosks-for-hospitals)  
20. An Efficient Gaze Control System for Kiosk-Based Embodied Conversational Agents in Multi-Party Conversations \- MDPI, accessed February 9, 2026, [https://www.mdpi.com/2079-9292/14/8/1592](https://www.mdpi.com/2079-9292/14/8/1592)  
21. AI-Powered Customer Service Kiosks with Avatars \- LamasaTech, accessed February 9, 2026, [https://www.lamasatech.com/solutions/ai-powered-customer-service-kiosks/](https://www.lamasatech.com/solutions/ai-powered-customer-service-kiosks/)  
22. Build with Google Antigravity, our new agentic development platform, accessed February 9, 2026, [https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/](https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/)  
23. I Made iPhone UI in Seconds with Google's Antigravity \- Analytics Vidhya, accessed February 9, 2026, [https://www.analyticsvidhya.com/blog/2025/11/google-antigravity/](https://www.analyticsvidhya.com/blog/2025/11/google-antigravity/)  
24. How You Can Use Google Antigravity to Build Internal Tools Like 'Codelivery' \- Applivery, accessed February 9, 2026, [https://www.applivery.com/blog/tech/google-antigravity-codelivery/](https://www.applivery.com/blog/tech/google-antigravity-codelivery/)  
25. Getting Started with Google Antigravity, accessed February 9, 2026, [https://codelabs.developers.google.com/getting-started-google-antigravity](https://codelabs.developers.google.com/getting-started-google-antigravity)  
26. Google Antigravity Explained: How It's Changing Engineering \- Emvigo Technologies, accessed February 9, 2026, [https://emvigotech.com/blog/google-antigravity-explained/](https://emvigotech.com/blog/google-antigravity-explained/)  
27. Introducing Google Antigravity, a New Era in AI-Assisted Software Development, accessed February 9, 2026, [https://antigravity.google/blog/introducing-google-antigravity](https://antigravity.google/blog/introducing-google-antigravity)  
28. Google Antigravity: Multi-Agent AI for Next-Gen Coding \- Talent500, accessed February 9, 2026, [https://talent500.com/blog/google-antigravity-multi-agent-ai-coding/](https://talent500.com/blog/google-antigravity-multi-agent-ai-coding/)  
29. Reacting to Input with State, accessed February 9, 2026, [https://react.dev/learn/reacting-to-input-with-state](https://react.dev/learn/reacting-to-input-with-state)  
30. MachineLogic State Machines: A Comprehensive Guide \- Vention, accessed February 9, 2026, [https://docs.vention.io/docs/state-machine-machinelogic](https://docs.vention.io/docs/state-machine-machinelogic)  
31. UX in Healthcare: 4 Best Practices for Engaging Patients | Insights | Oomph, Inc, accessed February 9, 2026, [https://www.oomphinc.com/insights/healthcare-ux-best-practices-engaging-patients/](https://www.oomphinc.com/insights/healthcare-ux-best-practices-engaging-patients/)  
32. State Machines and User Interface work \-- any examples/experience? \- Stack Overflow, accessed February 9, 2026, [https://stackoverflow.com/questions/595231/state-machines-and-user-interface-work-any-examples-experience](https://stackoverflow.com/questions/595231/state-machines-and-user-interface-work-any-examples-experience)  
33. Cross-Platform Text-to-Speech with Real-time Highlighting (Kotlin Multiplatform \+ Swift Interoperability) | by Meet | ProAndroidDev, accessed February 9, 2026, [https://proandroiddev.com/cross-platform-text-to-speech-with-real-time-highlighting-kotlin-multiplatform-swift-9a02fa667f6f](https://proandroiddev.com/cross-platform-text-to-speech-with-real-time-highlighting-kotlin-multiplatform-swift-9a02fa667f6f)  
34. Give Your Web Apps a Voice with Eleven Labs AI \- Vue School Articles, accessed February 9, 2026, [https://vueschool.io/articles/vuejs-tutorials/nuxt-content-text-to-speech-with-eleven-labs/](https://vueschool.io/articles/vuejs-tutorials/nuxt-content-text-to-speech-with-eleven-labs/)  
35. iOS Real-Time TTS: Streaming Text-to-Speech Tutorial \[2025\], accessed February 9, 2026, [https://picovoice.ai/blog/ios-streaming-text-to-speech/](https://picovoice.ai/blog/ios-streaming-text-to-speech/)  
36. How a design system for healthcare can ensure patient safety \- Better Care, accessed February 9, 2026, [https://www.better.care/blog-en/how-a-design-system-for-healthcare-can-ensure-patient-safety/](https://www.better.care/blog-en/how-a-design-system-for-healthcare-can-ensure-patient-safety/)  
37. How UX Design In Healthcare Apps Drives Better Outcomes \- Technology Rivers, accessed February 9, 2026, [https://technologyrivers.com/blog/how-ux-design-in-healthcare-apps-drives-better-outcomes/](https://technologyrivers.com/blog/how-ux-design-in-healthcare-apps-drives-better-outcomes/)  
38. Challenges of UX design in healthcare \- MagicFlux, accessed February 9, 2026, [https://magicflux.co/blog/the-hidden-complexity-of-healthcare-ux](https://magicflux.co/blog/the-hidden-complexity-of-healthcare-ux)  
39. The Future of UX for AI-Driven Healthcare User Interfaces \- UXmatters, accessed February 9, 2026, [https://www.uxmatters.com/mt/archives/2025/08/the-future-of-ux-for-ai-driven-healthcare-user-interfaces.php](https://www.uxmatters.com/mt/archives/2025/08/the-future-of-ux-for-ai-driven-healthcare-user-interfaces.php)  
40. Wayfinding Kiosks for Healthcare \- Eye-In Media, accessed February 9, 2026, [https://eye-in.com/interactive-wayfinding/healthcare](https://eye-in.com/interactive-wayfinding/healthcare)  
41. Building Interactive Touchscreen Kiosks: A Developer's Guide \- DEV Community, accessed February 9, 2026, [https://dev.to/anony9653/building-interactive-touchscreen-kiosks-a-developers-guide-4576](https://dev.to/anony9653/building-interactive-touchscreen-kiosks-a-developers-guide-4576)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAABFElEQVR4AdyRvWoCURCFTYIp0iUhkL9KC8FGsBFLQUFLSx/AV7DyNSx9EkUrLVSwsBRR/AMRa0EU/c7iynL3Ntrpcr6d2blz4M7Oc+CG585MKUZcw9HDjrwGn+DInKlJ9QuqIGOO+AoZ2IAj06TiO68YTGEAPtlM33SFoAcr8MlmitP1AV3Yg082U4IuNbeIVpkmzZOkU/MMiVaZJneePt2Xv0XuSn8yaJrcedp06YqEi57IyhAxTVqumjscmgpT+IOR16R5tJ8FB2PwKshHCRqw9Zq0myhFcz8/1CqQBV07IFOajyWo+Y2YhwnM4QA6KxK1ghnRMdVJfkGDihfy/zPKVRMFaprXMZFfJ13vOgfdj2g6AQAA//8qJCJpAAAABklEQVQDAMaiLjFlYVqsAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAABdElEQVR4AeyUTSuEURiGx+dCNkj5SmIhCmUjS0WxtMPexg+w8jcs/Qd7YsUCpVhYSOQzycpCibiuYcbrzBkm0yymZrqveZ73nOfcbz3znKlOlfBTMY82N2zLBFUP8J7ghXwDWiCfetiYgx8KzbfZbYU18AUzxHqYgkdIaoCHJdiCM7CW8K3Q3J0mvkbgEo7hN92yuQJ3kKOYeRtVvXAA95BPJ2yswzm8QY5i5qNUNcM+vMK/FTMfw03THWJRCs3t9ziO9vuUWJRC80y/D3ENp4OllJNTZ1IIoXmm37sctjWErKrInIx+YkEKzb1Emu5FTvex1gnONOFvJc3tt/N9wzHHi5CVrVjmyQvzTCxISXNne5BT4Xy3s7YK02C7CFHVsmrrCJ/SfJLUm6ZpA/ksXMA1eDncWyR3NK+IGXnOGulmcQGe4AiGIKX5JkkH+FapIe/6wtw1mWfN34OQluesS9Y0sjMM6b8NzclLo4p5tK/l25YPAAAA///JdVtbAAAABklEQVQDAD5uPTHf6UpSAAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAB8klEQVR4AeyUSShFYRTHr7FImVLGFEqkZM6GlHFpacOKJUksxAIJOyUbZWNjJ3vCBhlKWEnmKdNSMvv9b+++3r3vKpu3ezq/e853zufc8517vhdqBPAvmNy1uc621LDrEX58eMdegkRwSgqOQZiBIcgBrziTrxJJglnQC5rQkVAHz+Ar5SzmYA2moRSOoQdCwHAmly+eRyFcwiG4SRTOfpiHDdiHVtiBYSgG1+TJBLJgF+7BTeJwFsEkFIBEJ1vEiIZqcE2utyYQVBWfaDd5wqlEm+gHsOTLY0RIu7WlgoCSrqP/kg8CXdAAdyAJ51EG37AFfpWr35UE1G99HMx/Swk7NQAaBrMwZ+VWv/fYqB6ibKLJMY9s8xpGLOtRWIBu0Mn8Krf6rQlQa9jnFY3XAKtc8BW9bALHAXTAC5jirFyXSEm3zaj9kc0yDU7AEiWeYnEBvfAKeVAPtsrVb833DYEz8BUl6cOxAkqAMnSSTowjGAdrUqqwY8CWXLOdj9M537riuoGNxNQulJm4DWMEdCNVuYZAjOEzx1NtqWVxC0qqC9CMfQ7XoGoUa8fWBFyhJfrw+i3RTVWrMnBavGHrf8zKl1mkgo4pwrDTPciWT7Tg0/dAGZrtTAz5neikp8TM5NIBQW0JSGIlDSZXF/wIaFt+AQAA//+Gr5WXAAAABklEQVQDALoPXDGIIZDPAAAAAElFTkSuQmCC>