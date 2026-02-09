# **Chiến lược Phát triển và Thiết kế Luồng Trải nghiệm Cabin Sức khỏe Thông minh Tích hợp Trí tuệ Nhân tạo: Phân tích Chuyên sâu và Đặc tả Yêu cầu Nghiệp vụ (BRD)**

Sự chuyển dịch của ngành y tế toàn cầu sang mô hình chăm sóc sức khỏe chủ động và dựa trên giá trị đã thúc đẩy sự ra đời của các trạm y tế tự phục vụ (health kiosks) như một giải pháp thiết yếu để thu hẹp khoảng cách tiếp cận y khoa. Tại Việt Nam, xu hướng này không chỉ mang tính công nghệ thuần túy mà còn là một mắt xích chiến lược trong chương trình Chuyển đổi số quốc gia đến năm 2025, định hướng đến năm 2030 của Bộ Y tế.1 Việc thiết kế một hệ thống cabin đo sức khỏe thông minh đòi hỏi sự thấu hiểu sâu sắc về tương tác người máy (HCI), kỹ thuật tích hợp cảm biến IoT y tế, và đặc biệt là lớp trí tuệ nhân tạo (AI) điều phối toàn bộ hành trình trải nghiệm của người dùng từ lúc tiếp cận cho đến khi hoàn tất giao dịch dược phẩm.3 Báo cáo này đi sâu vào phân tích thiết kế luồng trải nghiệm màn hình tại cabin sức khỏe, tuân thủ quy trình 6 bước khép kín, đồng thời xây dựng tài liệu đặc tả yêu cầu nghiệp vụ (BRD) chuẩn mực cho hệ thống này.

## **Phân tích Hệ sinh thái và Kiến trúc Hệ thống Cabin Sức khỏe**

Kiến trúc của một cabin sức khỏe thông minh không đơn thuần là một máy tính đặt trong khung sắt, mà là một hệ thống tích hợp phức tạp bao gồm phần cứng cơ khí, các thiết bị đo sinh trắc học chuẩn y tế, hệ thống máy tính biên (Edge Computing) xử lý AI thời gian thực và kết nối đám mây để quản lý dữ liệu.5 Nền tảng này phải đảm bảo khả năng vận hành liên tục, tính chính xác lâm sàng và sự an toàn tuyệt đối về dữ liệu cá nhân theo các quy định pháp luật hiện hành tại Việt Nam như Nghị định 13/2023/NĐ-CP.7

Hệ thống điều khiển trung tâm thường dựa trên các máy tính công nghiệp có khả năng chịu nhiệt và hoạt động bền bỉ, kết nối với các thiết bị ngoại vi thông qua các giao thức đa dạng như RS232, USB 3.0, Bluetooth Low Energy (BLE) và đặc biệt là các giao thức chuẩn y tế như HL7 FHIR để đảm bảo tính tương hợp dữ liệu với hệ thống quản lý bệnh viện (HIS) và hồ sơ sức khỏe điện tử (EHR).3

| Thành phần kiến trúc | Chức năng chính | Công nghệ chủ đạo |
| :---- | :---- | :---- |
| Hệ thống Thị giác máy tính | Nhận diện người, FaceID, OCR giấy tờ | Camera 4K, Deep Learning (YOLO, CNN) |
| Lớp Hội thoại AI | Tư vấn giọng nói, nhận diện ý định | NLP, LLM, Text-to-Speech (TTS) |
| Trạm đo sinh trắc học | Thu thập chỉ số huyết áp, ECG, SpO2 | IoT Sensors, Digital Signal Processing |
| Module Định danh | Đọc CCCD, NFC, QR Code | RFID/NFC Reader, QR Scanner |
| Hệ thống Truyền thông | Telehealth, đồng bộ dữ liệu | WebRTC, 5G/Fiber Optic, mã hóa TLS 1.3 |
| Lớp Ứng dụng & HMI | Giao diện màn hình chạm, hướng dẫn AI | React/Flutter, UX/UI y tế chuyên biệt |

Sự phối hợp giữa các thành phần này tạo nên một thực thể "AI điều phối" xuyên suốt, giúp biến một không gian vật lý tĩnh lặng thành một môi trường tương tác sống động, nơi AI không chỉ phản hồi mà còn dự đoán nhu cầu của người dùng.4

## **Bước 1: Tiếp cận Thông minh \- Cơ chế Kích hoạt và Chào đón Ambient AI**

Giai đoạn khởi đầu của trải nghiệm người dùng không bắt đầu tại màn hình chạm mà diễn ra ngay khi người dùng bước vào vùng không gian ảnh hưởng của cabin. Đây là khái niệm "Ambient Intelligence" \- trí tuệ môi trường, nơi hệ thống luôn trong trạng thái sẵn sàng nhưng không xâm lấn.11 Hệ thống sử dụng camera tích hợp tại màn hình kết hợp với các thuật toán phân tích hình ảnh để thực hiện chức năng Phát hiện người (AI People Detection).12

Thuật toán AI trong giai đoạn này thực hiện các nhiệm vụ phức tạp như xác định ranh giới không gian (bounding box), phân tích hướng di chuyển và ước tính khoảng cách. Khi người dùng vượt qua ngưỡng khoảng cách quy định (ví dụ 1.5m), hệ thống sẽ chuyển từ chế độ chờ (Standby/Advertising) sang chế độ chào đón chủ động.12 AI tư vấn lúc này sẽ phát ra lời chào thông qua hệ thống âm thanh định hướng, đồng thời màn hình hiển thị các hiệu ứng hình ảnh mời gọi.

Phân tích sâu về tâm lý học hành vi chỉ ra rằng sự chủ động của AI trong bước này giúp giảm bớt "rào cản công nghệ" (technological friction) đối với những người dùng không am hiểu kỹ thuật.14 Thay vì để người dùng tự tìm cách khởi động máy, AI sẽ hướng dẫn: "Chào mừng bạn đến với cabin sức khỏe thông minh. Vui lòng đứng trước màn hình và thực hiện theo các chỉ dẫn sau để bắt đầu kiểm tra sức khỏe".16 Việc sử dụng ngôn ngữ tự nhiên (NLP) và tông giọng ấm áp giúp xây dựng lòng tin ngay từ giây đầu tiên, một yếu tố then chốt trong dịch vụ y tế.10

## **Bước 2: Sàng lọc Thông tin Sức khỏe và Định danh Đa phương thức**

Sau khi tiếp cận, bước thứ hai đóng vai trò là "Cổng vào dữ liệu". Luồng trải nghiệm tại đây được thiết kế để tối đa hóa tốc độ nhập liệu trong khi vẫn đảm bảo tính chính xác của hồ sơ bệnh lý sơ bộ. Người dùng sẽ tương tác với một giao diện chọn lựa triệu chứng trực quan. Thay vì một danh sách văn bản khô khan, hệ thống sử dụng bản đồ cơ thể 3D hoặc các biểu tượng (icons) minh họa sống động để người dùng chỉ ra vùng cơ thể đang gặp vấn đề.4

Cơ chế định danh trong bước này là một sự tích hợp đa phương thức (Multimodal Authentication):

1. **Nhận diện khuôn mặt (FaceID):** Nếu người dùng đã có tài khoản trong hệ thống, AI sẽ so khớp các đặc điểm sinh học để truy xuất hồ sơ trong vài giây.9  
2. **Quét mã QR CCCD:** Sử dụng công nghệ nhận dạng ký tự quang học (OCR) để tự động hóa việc điền các thông tin như họ tên, ngày sinh, giới tính và số định danh cá nhân từ thẻ căn cước công dân gắn chip.9  
3. **Nhập liệu thủ công:** Dành cho các trường hợp ngoại lệ hoặc người dùng mới hoàn toàn. AI sẽ hỗ trợ dự đoán từ khi người dùng nhập liệu triệu chứng để rút ngắn thời gian thao tác.10

Điểm đặc biệt trong thiết kế luồng này là nếu người dùng đã quét CCCD ở bước này, hệ thống sẽ ghi nhớ trạng thái tạm thời. Khi đến Bước 4, chỉ cần một thao tác chạm thẻ NFC kết hợp quét khuôn mặt (2-factor authentication) là kết quả sẽ được lưu trữ chính thức mà không cần nhập lại thông tin.20 AI trong bước này không chỉ đóng vai trò thu nhận mà còn là người thẩm định; nó sẽ phân tích mức độ ưu tiên của các triệu chứng để chuẩn bị kịch bản đo lường ở Bước 3\.10

## **Bước 3: Đo lường Tương tác \- Quy trình Vitals Check Điều phối bởi AI**

Đây là giai đoạn tương tác vật lý cao nhất, nơi người dùng tiếp xúc với các thiết bị cảm biến. Thách thức lớn nhất của các kiosk y tế tự phục vụ là người dùng thường thao tác sai tư thế, dẫn đến kết quả đo không chính xác.3 Để giải quyết vấn đề này, AI đóng vai trò như một "Điều dưỡng viên ảo" hướng dẫn từng bước (Step-by-step guidance) qua video minh họa và phản hồi giọng nói thời gian thực.

Hệ thống thiết bị đo tại cabin bao gồm:

* **Chiều cao và Cân nặng:** Sử dụng cảm biến siêu âm và loadcell. AI nhắc nhở người dùng đứng thẳng và nhìn về phía trước.6  
* **SpO2 và Nhiệt độ:** Cảm biến hồng ngoại không tiếp xúc hoặc kẹp ngón tay. AI hướng dẫn vị trí đặt tay và thời gian cần thiết để có kết số chính xác.6  
* **Huyết áp:** Vòng bít tự động. AI quan sát qua camera để đảm bảo cánh tay người dùng đặt ngang tim và nhắc nhở không nói chuyện trong khi đo.16  
* **ECG (Điện tâm đồ):** Các điện cực cầm tay hoặc dán. AI sẽ phân tích chất lượng tín hiệu theo thời gian thực (Signal Quality Index) và yêu cầu người dùng điều chỉnh tư thế nếu phát hiện nhiễu quá mức.5

| Thiết bị đo | Thông số thu thập | Hướng dẫn AI | Xử lý lỗi thường gặp |
| :---- | :---- | :---- | :---- |
| Cân & Thước siêu âm | BMI, % mỡ, Cơ, Xương | "Vui lòng đứng thẳng, nhìn thẳng" | Phát hiện vật cản trên bàn cân |
| Máy đo Huyết áp | Tâm thu, tâm trương, mạch | "Thả lỏng cánh tay, ngang tim" | Bao đo quấn lỏng hoặc người dùng cử động |
| Oximeter (SpO2) | Nồng độ oxy, nhịp tim | "Đặt ngón tay trỏ vào khe cảm biến" | Tay lạnh hoặc sơn móng tay gây nhiễu |
| Nhiệt kế hồng ngoại | Nhiệt độ trán/tai | "Giữ khoảng cách 5cm với cảm biến" | Nhiệt độ môi trường quá cao/thấp |
| Điện tâm đồ (ECG) | Sóng điện tim, rối loạn nhịp | "Giữ hai tay trên cực điện trong 30s" | Tín hiệu yếu do da khô hoặc run tay |

Xuyên suốt quá trình đo, AI không chỉ hiển thị các con số mà còn đưa ra các lời giải thích ngay lập tức về ý nghĩa của chúng, ví dụ: "Nhịp tim của bạn đang ở mức 75 nhịp/phút, đây là mức bình thường đối với độ tuổi của bạn".4 Điều này giúp giảm bớt lo âu cho người dùng và tăng tính giáo dục sức khỏe.15

## **Bước 4: Kiểm tra và Lưu kết quả \- Quản trị Dữ liệu và Xác thực Sinh trắc học**

Sau khi hoàn tất quá trình đo, màn hình sẽ hiển thị một bảng tổng hợp kết quả (Health Dashboard). Đây là thời điểm quan trọng để người dùng quyết định quyền riêng tư đối với dữ liệu y tế của mình. Hệ thống cung cấp hai lựa chọn rõ ràng:

1. **Lưu trữ ẩn danh (Anonymous):** Kết quả được in ra hoặc hiển thị qua mã QR dùng một lần. Dữ liệu không gắn với danh tính cá nhân và sẽ bị xóa khỏi bộ nhớ đệm sau khi phiên làm việc kết thúc. Phương thức này phù hợp với người dùng chỉ muốn kiểm tra nhanh mà không muốn để lại dấu vết số.25  
2. **Lưu trữ định danh (Identified):** Kết quả được lưu vào hồ sơ sức khỏe điện tử cá nhân. Tại đây, hệ thống yêu cầu xác thực bằng khuôn mặt và CCCD (hoặc NFC như đã thiết lập ở Bước 2\) để đảm bảo tính pháp lý và bảo mật.20

Việc lưu trữ định danh cho phép AI thực hiện các phân tích so sánh với các lần đo trước đó, từ đó phát hiện các xu hướng sức khỏe bất thường theo thời gian (Trend analysis).4 AI tư vấn sẽ nhắc nhở: "Dựa trên dữ liệu lưu trữ, huyết áp của bạn đã tăng nhẹ trong 3 tháng qua. Bạn nên cân nhắc thảo luận điều này với bác sĩ ở bước tiếp theo".4 Quy trình này tuân thủ nghiêm ngặt các tiêu chuẩn về bảo vệ dữ liệu nhạy cảm, đảm bảo rằng chỉ những bên được ủy quyền mới có thể truy cập thông tin.7

## **Bước 5: Tư vấn Telehealth \- Kết nối Bác sĩ dựa trên AI Triage**

Dựa vào các chỉ số vừa đo được và các triệu chứng ở Bước 2, AI sẽ thực hiện chức năng phân loại bệnh (Triage). Nếu các chỉ số nằm trong ngưỡng cảnh báo, AI sẽ đề xuất thực hiện cuộc gọi video call ngay lập tức với bác sĩ chuyên khoa.9

Luồng trải nghiệm Telehealth tại cabin được tối ưu hóa như sau:

* **Bàn giao dữ liệu (Handoff):** Khi kết nối với bác sĩ, toàn bộ dữ liệu sinh trắc học và lịch sử triệu chứng của người dùng được đẩy trực tiếp lên màn hình của bác sĩ. Bác sĩ không cần hỏi lại các thông số cơ bản, giúp tối ưu hóa thời gian tư vấn.13  
* **Hỗ trợ hội thoại:** AI có thể hoạt động ở chế độ nền để thực hiện ghi chú y khoa tự động (AI Medical Scribe), chuyển đổi cuộc đối thoại giữa bác sĩ và bệnh nhân thành các ghi chú SOAP chuẩn mực.11  
* **Chẩn đoán hỗ trợ:** AI gợi ý cho bác sĩ các khả năng chẩn đoán dựa trên dữ liệu thu thập được từ cảm biến và triệu chứng, nhưng bác sĩ vẫn là người đưa ra quyết định cuối cùng.14

Yêu cầu kỹ thuật cho bước này cực kỳ khắt khe về độ trễ và chất lượng hình ảnh để bác sĩ có thể quan sát các biểu hiện lâm sàng qua camera chất lượng cao.35 AI cũng sẽ theo dõi cảm xúc của người dùng qua khuôn mặt để cảnh báo bác sĩ nếu bệnh nhân đang quá lo lắng hoặc đau đớn.13

## **Bước 6: Hoàn tất Hành trình \- Giao thuốc tại nhà và Đăng ký KCB**

Bước cuối cùng chuyển đổi từ tư vấn sang hành động cụ thể. Tùy thuộc vào kết luận của bác sĩ trong phiên Telehealth, AI sẽ điều phối các dịch vụ hậu cần (logistics):

* **Kê đơn và Giao thuốc:** Nếu bác sĩ kê đơn điện tử, hệ thống sẽ hiển thị danh mục thuốc và chi phí. Người dùng có thể thanh toán qua QR (VietQR) hoặc ví điện tử. Đơn hàng sau đó được đẩy về các chuỗi nhà thuốc đối tác (như Long Châu, Pharmacity) để giao đến địa chỉ của người dùng trong thời gian ngắn nhất.1  
* **Đăng ký khám chữa bệnh (KCB):** Trong trường hợp cần kiểm tra chuyên sâu, AI sẽ hỗ trợ đặt lịch hẹn tại các bệnh viện hoặc phòng khám liên kết, đồng thời gửi toàn bộ kết quả đo tại cabin cho cơ sở y tế đó để rút ngắn quy trình tiếp đón.4

AI tư vấn sẽ kết thúc phiên làm việc bằng một bản tóm tắt các bước tiếp theo cần thực hiện và lời chúc sức khỏe, tạo ra một trải nghiệm kết thúc (off-boarding) chuyên nghiệp và ấm áp.17

## **Đặc tả Yêu cầu Nghiệp vụ (BRD) cho Cabin Sức khỏe Thông minh**

Tài liệu này đóng vai trò là kim chỉ nam cho các đội ngũ phát triển sản phẩm, từ kỹ sư phần cứng đến lập trình viên AI và thiết kế UX.

### **1\. Yêu cầu Chức năng (Functional Requirements)**

| Mã yêu cầu | Nhóm chức năng | Mô tả chi tiết yêu cầu | Ưu tiên |
| :---- | :---- | :---- | :---- |
| FR-1.1 | AI Vision | Phát hiện sự hiện diện của người dùng trong bán kính 2m và kích hoạt kịch bản chào hỏi. | P0 |
| FR-1.2 | AI Vision | Nhận diện khuôn mặt (FaceID) với độ chính xác \>98% trong điều kiện ánh sáng thay đổi. | P0 |
| FR-2.1 | Data Entry | OCR mã QR trên CCCD và tự động điền các trường thông tin cá nhân. | P0 |
| FR-2.2 | Symptom Checker | Giao diện chọn triệu chứng thích ứng theo độ tuổi và giới tính của người dùng. | P1 |
| FR-3.1 | IoT Integration | Đồng bộ dữ liệu thời gian thực từ ít nhất 6 loại cảm biến y tế (Huyết áp, ECG, SpO2, Temp, Height, Weight). | P0 |
| FR-3.2 | AI Guidance | Cung cấp hướng dẫn đo lường bằng video hoạt hình và giọng nói tự nhiên (TTS). | P0 |
| FR-4.1 | Privacy Logic | Cho phép người dùng chuyển đổi giữa chế độ "Lưu trữ ẩn danh" và "Lưu trữ định danh". | P0 |
| FR-4.2 | NFC Logic | Hỗ trợ lưu kết quả nhanh thông qua giao thức NFC sau khi đã xác thực FaceID. | P1 |
| FR-5.1 | Telehealth | Tích hợp WebRTC cho phép cuộc gọi video chất lượng HD với độ trễ \< 200ms. | P0 |
| FR-6.1 | E-Commerce | Kết nối API với hệ thống nhà thuốc để xử lý đơn hàng và thanh toán trực tuyến. | P1 |

### **2\. Yêu cầu Phi chức năng (Non-functional Requirements)**

| Nhóm yêu cầu | Đặc tả chi tiết | Tiêu chuẩn tuân thủ |
| :---- | :---- | :---- |
| **Bảo mật** | Mã hóa dữ liệu y tế ở cấp độ quân sự, xác thực 2 lớp cho các thao tác lưu trữ. | PDPD, ISO 27001 |
| **Hiệu năng** | Thời gian phản hồi của AI tư vấn (TTFT) không quá 500ms. | User Experience Standard |
| **Độ tin cậy** | Hệ thống hoạt động 24/7 với tỷ lệ downtime \< 0.1%. | Industrial Grade |
| **Tính khả dụng** | Giao diện hỗ trợ người khuyết tật (giọng nói, phông chữ lớn, chiều cao cabin cho xe lăn). | ADA Compliance |
| **Tương hợp** | Định dạng dữ liệu đầu ra tuân theo chuẩn HL7 FHIR. | Healthcare Data Standard |

## **Phân tích Chuyên sâu về Vai trò của Trí tuệ Nhân tạo trong Tương tác Y tế**

Trí tuệ nhân tạo trong hệ thống cabin này không chỉ là các thuật toán xử lý dữ liệu đơn thuần mà là một lớp "trí tuệ tương tác" (Interactive Intelligence) có khả năng thấu cảm và điều chỉnh hành vi theo ngữ cảnh. Phân tích các xu hướng mới nhất cho thấy AI đang dần chuyển từ mô hình phản ứng (Reactive) sang mô hình dự đoán (Predictive) và kiến tạo (Generative).4

Trong Bước 3, AI sử dụng các mạng thần kinh tích chập (CNN) để phân tích tư thế người dùng qua camera. Nếu phát hiện người dùng đang gồng tay khi đo huyết áp, AI sẽ không chỉ đưa ra cảnh báo lỗi mà còn đưa ra lời khuyên làm dịu: "Tôi thấy bạn hơi căng thẳng, hãy hít thở sâu và thả lỏng cánh tay để chúng ta đo lại nhé".10 Đây chính là sự kết hợp giữa kỹ thuật đo lường chính xác và tâm lý học hành vi (Behavioral Economics) để đảm bảo chất lượng dữ liệu đầu vào.

Hơn nữa, việc tích hợp các mô hình ngôn ngữ lớn (LLM) cho phép cabin trả lời các câu hỏi y khoa thông thường của người dùng một cách tự nhiên. Tuy nhiên, để đảm bảo an toàn y tế, hệ thống phải được thiết kế với các "hàng rào bảo vệ" (guardrails) nghiêm ngặt để tránh đưa ra lời khuyên chuyên môn sai lệch. AI chỉ được phép giải thích các thuật ngữ hoặc cung cấp thông tin giáo dục sức khỏe đã được phê duyệt, đồng thời luôn nhắc nhở người dùng tham vấn bác sĩ ở Bước 5\.32

## **Chiến lược Quản trị Dữ liệu và Tuân thủ Pháp lý tại Việt Nam**

Trong bối cảnh y tế số, dữ liệu cá nhân là tài sản nhạy cảm nhất. Nghị định 13/2023/NĐ-CP (PDPD) và Nghị định 102/2025/NĐ-CP về quản lý dữ liệu y tế số đặt ra những tiêu chuẩn cực kỳ khắt khe cho các đơn vị vận hành cabin sức khỏe tại Việt Nam.7

Thiết kế hệ thống phải đảm bảo các nguyên tắc sau:

* **Sự đồng thuận rõ ràng (Explicit Consent):** Ở Bước 2 và Bước 4, người dùng phải được thông báo rõ ràng về việc dữ liệu nào sẽ được thu thập, mục đích sử dụng là gì và ai sẽ có quyền truy cập. Hệ thống không được mặc định chọn các ô đồng ý.8  
* **Quyền được lãng quên:** Người dùng có quyền yêu cầu xóa toàn bộ dữ liệu lịch sử của mình thông qua giao diện kiosk hoặc ứng dụng di động liên kết.7  
* **Bảo mật theo thiết kế (Security by Design):** Việc sử dụng FaceID và xác thực CCCD gắn chip giúp ngăn chặn các cuộc tấn công giả mạo danh tính (identity theft), đồng thời đảm bảo rằng dữ liệu y tế chỉ được gán cho chính chủ thể đó.20

Việc kết nối với nền tảng VNeID không chỉ là một yêu cầu kỹ thuật mà là một bước đi chiến lược để hợp pháp hóa dữ liệu thu thập được từ cabin, biến chúng thành một phần chính thức của hồ sơ sức khỏe điện tử quốc gia.20 Điều này cho phép dữ liệu từ cabin có giá trị tham chiếu tại bất kỳ bệnh viện nào trên toàn quốc, giúp giảm thiểu việc xét nghiệm và đo lường lặp lại không cần thiết.

## **Tác động Kinh tế và Xã hội của Mô hình Cabin Sức khỏe Thông minh**

Sự xuất hiện của các cabin sức khỏe tại các địa điểm công cộng như trung tâm thương mại, khu công nghiệp, chung cư và vùng sâu vùng xa mang lại những tác động tích cực đa chiều.

Về mặt kinh tế, mô hình này giúp giảm chi phí vận hành y tế bằng cách thực hiện sàng lọc ban đầu (Primary screening) mà không cần sự hiện diện trực tiếp của nhân viên y tế tại hiện trường.4 Điều này giúp các bệnh viện tập trung nguồn lực vào những ca bệnh nặng, đồng thời giảm chi phí đi lại và thời gian chờ đợi cho người dân.9

Về mặt xã hội, cabin sức khỏe đóng vai trò là một công cụ giáo dục sức khỏe mạnh mẽ. Thông qua các tương tác AI sinh động, người dân được tiếp cận với các khái niệm về chỉ số BMI, huyết áp, rối loạn nhịp tim một cách dễ hiểu nhất.15 Đây là bước đi quan trọng để chuyển dịch từ tư duy "chữa bệnh" sang "phòng bệnh", góp phần nâng cao tuổi thọ và chất lượng sống cho cộng đồng.

Thị trường dược phẩm điện tử (E-pharmacy) tại Việt Nam, với tốc độ tăng trưởng dự kiến trên 13% mỗi năm, sẽ được hưởng lợi trực tiếp từ các cabin này.1 Cabin đóng vai trò là "điểm chạm vật lý" (physical touchpoint) hoàn hảo để bác sĩ kê đơn và người dùng mua thuốc ngay lập tức, tạo ra một vòng lặp khép kín từ chẩn đoán đến điều trị.20

## **Kết luận và Khuyến nghị Phát triển**

Hệ thống cabin sức khỏe thông minh tích hợp AI đại diện cho tương lai của y tế số \- một tương lai nơi công nghệ phục vụ con người một cách thấu cảm, chính xác và an toàn. Quy trình 6 bước được đề xuất không chỉ giải quyết bài toán về mặt kỹ thuật đo lường mà còn tối ưu hóa hành trình cảm xúc của người dùng, biến một buổi kiểm tra sức khỏe vốn dĩ đầy áp lực thành một trải nghiệm công nghệ thú vị và hữu ích.

Để triển khai thành công mô hình này, các đơn vị phát triển cần lưu ý:

1. **Luôn đặt AI làm trung tâm của sự hướng dẫn:** Không bao giờ để người dùng rơi vào trạng thái "không biết làm gì tiếp theo". AI phải luôn hiện diện để dẫn dắt một cách chủ động.10  
2. **Đảm bảo tính chính xác lâm sàng:** Các thiết bị đo phải được hiệu chuẩn định kỳ và AI phải có khả năng phát hiện các sai số đo lường để yêu cầu thực hiện lại.3  
3. **Tuân thủ tuyệt đối các quy định về dữ liệu:** Sự tin tưởng của người dùng là tài sản lớn nhất. Bất kỳ sự cố rò rỉ dữ liệu nào cũng sẽ hủy hoại toàn bộ nỗ lực xây dựng hệ sinh thái.7  
4. **Tích hợp sâu rộng với các nền tảng quốc gia:** Việc kết nối với VNeID và các hệ thống bảo hiểm y tế là chìa khóa để đưa cabin sức khỏe trở thành một phần thiết yếu của đời sống xã hội.20

Với sự đầu tư đúng đắn vào thiết kế trải nghiệm và năng lực AI, cabin sức khỏe thông minh sẽ trở thành "người gác cổng" tận tụy cho sức khỏe cộng đồng, góp phần hiện thực hóa mục tiêu mỗi người dân có một bác sĩ riêng và một hồ sơ sức khỏe điện tử trọn đời trong kỷ nguyên số hóa toàn diện.

#### **Works cited**

1. Vietnam E Pharmacy Market, By Region, Competition, Forecast & Opportunities, 2020-2030F, accessed February 9, 2026, [https://www.researchandmarkets.com/reports/5557909/vietnam-e-pharmacy-market-by-region](https://www.researchandmarkets.com/reports/5557909/vietnam-e-pharmacy-market-by-region)  
2. Vietnam E Pharmacy Market Size, Share, Trends, Growth and Forecast 2030, accessed February 9, 2026, [https://www.techsciresearch.com/report/vietnam-e-pharmacy-market/7901.html](https://www.techsciresearch.com/report/vietnam-e-pharmacy-market/7901.html)  
3. Implementation of Medical KIOSK: A Technical Review \- EUDL, accessed February 9, 2026, [https://eudl.eu/pdf/10.4108/eai.7-12-2021.2314756](https://eudl.eu/pdf/10.4108/eai.7-12-2021.2314756)  
4. How AI Will Transform Self-Service Healthcare Kiosks \- imageHOLDERS, accessed February 9, 2026, [https://www.imageholders.com/insights/how-ai-will-transform-self-service-healthcare-kiosks/](https://www.imageholders.com/insights/how-ai-will-transform-self-service-healthcare-kiosks/)  
5. ISSK- An Integrated Self Service Kiosk for Health Monitoring and Management \- ijstr, accessed February 9, 2026, [https://www.ijstr.org/final-print/sep2019/Issk-An-Integrated-Self-Service-Kiosk-For-Health-Monitoring-And-Management.pdf](https://www.ijstr.org/final-print/sep2019/Issk-An-Integrated-Self-Service-Kiosk-For-Health-Monitoring-And-Management.pdf)  
6. A Low-Cost Community Healthcare Kiosk, accessed February 9, 2026, [http://vigir.missouri.edu/\~gdesouza/Research/Conference\_CDs/IEEE\_HealthCom\_2011/papers/p274-sun.pdf](http://vigir.missouri.edu/~gdesouza/Research/Conference_CDs/IEEE_HealthCom_2011/papers/p274-sun.pdf)  
7. Vietnam Personal Data Protection Decree \- TrustArc, accessed February 9, 2026, [https://trustarc.com/regulations/vietnam-pdpd/](https://trustarc.com/regulations/vietnam-pdpd/)  
8. Data protection laws in Vietnam, accessed February 9, 2026, [https://www.dlapiperdataprotection.com/?t=law\&c=VN](https://www.dlapiperdataprotection.com/?t=law&c=VN)  
9. Vietnam's top 10 innovative AI solutions for healthcare \- TMA Solutions, accessed February 9, 2026, [https://www.tmasolutions.com/insights/ai-solutions-for-healthcare-from-vietnam](https://www.tmasolutions.com/insights/ai-solutions-for-healthcare-from-vietnam)  
10. Conversational Triage: Agentic AI in healthcare \- Infermedica, accessed February 9, 2026, [https://infermedica.com/conversational-triage](https://infermedica.com/conversational-triage)  
11. Conversational AI in Healthcare Guide with Examples \- Heidi Health, accessed February 9, 2026, [https://www.heidihealth.com/blog/conversational-ai-in-healthcare](https://www.heidihealth.com/blog/conversational-ai-in-healthcare)  
12. AI People Detection/AI Vehicle Detection/AI Face Detection | i-PRO Products, accessed February 9, 2026, [https://i-pro.com/products\_and\_solutions/en/surveillance/products/i-pro-ai-application](https://i-pro.com/products_and_solutions/en/surveillance/products/i-pro-ai-application)  
13. How Computer Vision AI Transforms Smart Hospitals & Healthcare \- Chooch AI, accessed February 9, 2026, [https://www.chooch.com/blog/how-ai-and-computer-vision-transform-hospital-operations/](https://www.chooch.com/blog/how-ai-and-computer-vision-transform-hospital-operations/)  
14. Kiosk UX UI — How To Design Checklist, accessed February 9, 2026, [https://kma.global/kiosk-ux-ui-how-to-design-checklist/](https://kma.global/kiosk-ux-ui-how-to-design-checklist/)  
15. Top 7 Healthcare UX/UI Design Trends to Watch in 2026 \- Excellent Webworld, accessed February 9, 2026, [https://www.excellentwebworld.com/healthcare-ux-ui-design-trends/](https://www.excellentwebworld.com/healthcare-ux-ui-design-trends/)  
16. Mastering Patient Calls: Essential Medical Receptionist Phone Script Examples, accessed February 9, 2026, [https://www.myaifrontdesk.com/blogs/mastering-patient-calls-essential-medical-receptionist-phone-script-examples](https://www.myaifrontdesk.com/blogs/mastering-patient-calls-essential-medical-receptionist-phone-script-examples)  
17. AI Voice Agent Script Best Practices: A Complete Design Guide \- JustCall, accessed February 9, 2026, [https://justcall.io/blog/best-practices-ai-voice-agent-scripts.html](https://justcall.io/blog/best-practices-ai-voice-agent-scripts.html)  
18. An AI-powered Public Health Automated Kiosk System for Personalized Care: An Experimental Pilot Study \- ResearchGate, accessed February 9, 2026, [https://www.researchgate.net/publication/390991006\_An\_AI-powered\_Public\_Health\_Automated\_Kiosk\_System\_for\_Personalized\_Care\_An\_Experimental\_Pilot\_Study](https://www.researchgate.net/publication/390991006_An_AI-powered_Public_Health_Automated_Kiosk_System_for_Personalized_Care_An_Experimental_Pilot_Study)  
19. AI-assisted facial analysis in healthcare: From disease detection to comprehensive management \- PMC, accessed February 9, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11873005/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11873005/)  
20. Việt Nam expands digital healthcare with e-prescriptions on VNeID, accessed February 9, 2026, [https://vietnamnews.vn/society/1723172/viet-nam-expands-digital-healthcare-with-e-prescriptions-on-vneid.html](https://vietnamnews.vn/society/1723172/viet-nam-expands-digital-healthcare-with-e-prescriptions-on-vneid.html)  
21. AI-Powered Healthcare Kiosks \- Vividcomm, accessed February 9, 2026, [https://vividcomm.com/2026/01/17/ai-powered-healthcare-kiosks/](https://vividcomm.com/2026/01/17/ai-powered-healthcare-kiosks/)  
22. Smart Vital Sign Kiosk & Vital Sign Measurement ... \- imedtac Co., Ltd., accessed February 9, 2026, [https://www.imedtac.com/en/service/imvs-aio/](https://www.imedtac.com/en/service/imvs-aio/)  
23. All-in-One Design Height Weight BMI Blood Pressure Kiosk, accessed February 9, 2026, [https://lekascale.en.made-in-china.com/product/oQkryBlCAmUw/China-All-in-One-Design-Height-Weight-BMI-Blood-Pressure-Kiosk.html](https://lekascale.en.made-in-china.com/product/oQkryBlCAmUw/China-All-in-One-Design-Height-Weight-BMI-Blood-Pressure-Kiosk.html)  
24. Browse thousands of Ecg UI images for design inspiration | Dribbble, accessed February 9, 2026, [https://dribbble.com/search/ecg-ui](https://dribbble.com/search/ecg-ui)  
25. Ten quick tips for protecting health data using de-identification and perturbation of structured datasets \- PMC, accessed February 9, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12456793/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12456793/)  
26. Anonymous identifier: how it's used in user tracking \- Statsig, accessed February 9, 2026, [https://www.statsig.com/perspectives/anonymous-identifier-user-tracking](https://www.statsig.com/perspectives/anonymous-identifier-user-tracking)  
27. Strategies for de-identification and anonymization of electronic health record data for use in multicenter research studies \- PMC, accessed February 9, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC6502465/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6502465/)  
28. Personal Data Privacy Protection Law: Comprehensive Guide \- Vietnam Briefing, accessed February 9, 2026, [https://www.vietnam-briefing.com/doing-business-guide/vietnam/company-establishment/vietnam-personal-data-privacy-law](https://www.vietnam-briefing.com/doing-business-guide/vietnam/company-establishment/vietnam-personal-data-privacy-law)  
29. Vietnam: New regulations for managing digital medical data \- Baker ..., accessed February 9, 2026, [https://insightplus.bakermckenzie.com/bm/data-technology/vietnam-new-regulations-for-managing-digital-medical-data](https://insightplus.bakermckenzie.com/bm/data-technology/vietnam-new-regulations-for-managing-digital-medical-data)  
30. Demystifying Vietnam's New Laws Regulating Data and Navigating Key Compliance for Businesses \- CMS LawNow, accessed February 9, 2026, [https://cms-lawnow.com/en/ealerts/2025/09/demystifying-vietnam-s-new-laws-regulating-data-and-navigating-key-compliance-for-businesses](https://cms-lawnow.com/en/ealerts/2025/09/demystifying-vietnam-s-new-laws-regulating-data-and-navigating-key-compliance-for-businesses)  
31. Telemedicine Technology Requirements \- AAAAI, accessed February 9, 2026, [https://www.aaaai.org/allergist-resources/telemedicine/technology](https://www.aaaai.org/allergist-resources/telemedicine/technology)  
32. Practical Guide to Voice AI for Hospitals | Must Read\! \- Webuters, accessed February 9, 2026, [https://www.webuters.com/ai-for-hospitals-that-actually-works](https://www.webuters.com/ai-for-hospitals-that-actually-works)  
33. AI Powered Clinical Workflows | Microsoft Cloud For Healthcare, accessed February 9, 2026, [https://www.microsoft.com/en-us/health-solutions/clinical-workflow](https://www.microsoft.com/en-us/health-solutions/clinical-workflow)  
34. Top 10 UX trends shaping digital healthcare in 2026, accessed February 9, 2026, [https://www.uxstudioteam.com/ux-blog/healthcare-ux](https://www.uxstudioteam.com/ux-blog/healthcare-ux)  
35. 5 Technical Requirements for Telehealth \- Curogram, accessed February 9, 2026, [https://curogram.com/blog/telehealth-tech-requirements](https://curogram.com/blog/telehealth-tech-requirements)  
36. What are the basic technical requirements for telehealth? \- Blog \- eVisit, accessed February 9, 2026, [https://blog.evisit.com/virtual-care-blog/what-are-the-basic-technical-requirements-for-telehealth](https://blog.evisit.com/virtual-care-blog/what-are-the-basic-technical-requirements-for-telehealth)  
37. Measuring What Matters: Performance Metrics for Voice AI Agents in Healthcare \- Artera, accessed February 9, 2026, [https://artera.io/blog/voice-ai-agents-healthcare/](https://artera.io/blog/voice-ai-agents-healthcare/)  
38. Vietnam E-Pharmacy Market | 2019 – 2030 \- Ken Research, accessed February 9, 2026, [https://www.kenresearch.com/vietnam-e-pharmacy-health-e-commerce-market](https://www.kenresearch.com/vietnam-e-pharmacy-health-e-commerce-market)  
39. Browse thousands of Medical Kiosk images for design inspiration \- Dribbble, accessed February 9, 2026, [https://dribbble.com/search/medical-kiosk](https://dribbble.com/search/medical-kiosk)  
40. A complete guide to chatbot scripts (With examples) | The Jotform Blog, accessed February 9, 2026, [https://www.jotform.com/ai/agents/chatbot-script-examples/](https://www.jotform.com/ai/agents/chatbot-script-examples/)  
41. Conversational patients with AI: training difficult dialogues in health \- Virtual Medical Coaching, accessed February 9, 2026, [https://blog.virtualmedicalcoaching.com/en/conversational-patients-with-ai-training-difficult-dialogues-in-health](https://blog.virtualmedicalcoaching.com/en/conversational-patients-with-ai-training-difficult-dialogues-in-health)  
42. UI/UX Design for Healthcare Platforms: Best Practices | by Rosalie \- Medium, accessed February 9, 2026, [https://rosalie24.medium.com/ui-ux-design-for-healthcare-platforms-best-practices-51ca24ba0ee0](https://rosalie24.medium.com/ui-ux-design-for-healthcare-platforms-best-practices-51ca24ba0ee0)