import { Image, Text, TouchableOpacity, View } from "react-native";
import { AppColor } from "../assets/AppColor";
import { useState } from "react";

export default function OverView() {
    const [fullViewState, setFullViewState] = useState<boolean>(false);
    return (
        <View
            style={{
                justifyContent: 'center', alignItems: 'center', borderTopWidth: 1,
                borderTopColor: AppColor.Gray01, marginTop: 10
            }}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: AppColor.Gray01, marginTop: 10,
                flexDirection: "row",
                flex: 2,
                padding: 5, justifyContent: 'center', alignItems: 'center'
            }}>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: AppColor.Gray31, fontSize: 16, fontWeight: 'bold' }}>Đăng ký nơi nghỉ của bạn</Text>
                    <Text style={{ color: AppColor.Gray31, fontSize: 15 }}>Tiếp cận hàng triệu khách hàng tiềm năng và nâng tầm doanh nghiệp của bạn với chúng tôi.</Text>
                </View>
                <Image
                    resizeMode="cover"
                    style={{ width: 180, height: 120, borderRadius: 10, flex: 1, marginLeft: 5 }}
                    source={require('../assets/imageview.png')}
                />
            </View>
            <Text style={{ fontSize: 18 }}>Đặt phòng khách sạn tại Việt Nam trên Finder</Text>
            <View style={{
                height: !fullViewState ? 90 : undefined,
                padding: 10,
                overflow: 'hidden'
            }}>
                <Text style={{ color: AppColor.Gray31, fontSize: 15, fontWeight: 'semibold' }}>Finder – Lựa chọn hàng đầu khi đặt phòng khách sạn trực tuyến</Text>
                <Text style={{ color: AppColor.Gray31, fontSize: 13, marginBottom: 10, marginTop: 10 }}>Là đại lý đặt phòng khách sạn hàng đầu Đông Nam Á, kể từ khi ra mắt đến nay, Finder đã giúp mọi chuyến du lịch của hơn 20 triệu tín đồ du lịch trở nên đơn giản hơn bao giờ hết. Không chỉ hoạt động tại Đông Nam Á, Finder hiện là đối tác của trên 200.000 khách sạn toàn thế giới, sẵn sàng đồng hành cùng bạn mọi lúc mọi nơi.

                    Với mạng lưới khách sạn rộng khắp, Finder mang đến vô vàn lựa chọn, đa dạng mọi phân khúc, từ khách sạn cao cấp, resort nghỉ dưỡng hàng đầu, đến các hostel, homestay hiện đại mà cá tính. Dù bạn phải đặt phòng gấp cho chuyến công tác, hay tìm kiếm một thiên đường trong mơ cho chuyến trăng mật lãng mạn, Finder cũng sẽ khiến bạn hài lòng với những khách sạn tốt nhất và mức giá ưu đãi nhất.

                    Tất cả những gì bạn cần làm là ba bước: tìm kiếm, đặt phòng khách sạn và thanh toán. Mọi thứ còn lại đã có Finder lo liệu.</Text>

                <Text style={{ color: AppColor.Gray31, fontSize: 15, fontWeight: 'semibold' }}>Tích hợp các tính năng ưu việt, đặt phòng khách sạn trên Finder đơn giản hơn bao giờ hết</Text>
                <Text style={{ color: AppColor.Gray31, fontSize: 13, marginBottom: 10, marginTop: 10 }}>Bắt đầu với việc nhập thông tin điểm đến tại mục “Tìm khách sạn”, hàng trăm kết quả sẽ được hiển thị trong tích tắc theo nhu cầu của bạn. Ứng dụng Finder sẽ phân loại kết quả theo hai phân khúc – Tiết kiệm và Cao cấp, giúp rút ngắn thời gian tìm kiếm. Đặc biệt, khi lựa chọn ngày nhận phòng, Finder sẽ thông báo đâu là những ngày có mức giá thấp nhất. Không cần so sánh ngược xuôi, đặt phòng khách sạn giá rẻ giờ đây chỉ cần vài bước tùy chỉnh.

                    Mọi thông tin chi tiết nhất về khách sạn luôn được cập nhật thường xuyên. Các tiện nghi, khu vực lân cận, và phần nhận xét từ các khách hàng trước sẽ giúp bạn có một đánh giá tổng quan về khách sạn đang cân nhắc. Mức giá hiển thị cũng là mức giá cuối cùng bạn phải thanh toán, đã bao gồm thuế, không phí giao dịch hoặc chi phí ẩn. Bạn chỉ cần một giao diện duy nhất để so sánh nhiều sự lựa chọn và dễ dàng đặt phòng khách sạn giá rẻ với đầy đủ tiện nghi nhất.

                    Các du khách thường xuyên có những chuyến du lịch ngẫu hứng, hoặc lịch trình thay đổi bất ngờ khiến bạn không chuẩn bị trước một nơi nghỉ ngơi thoải mái thì cũng đừng lo lắng. Tính năng “Khách sạn giờ chót” sẽ là vị cứu tinh cho bạn. Finder sẽ lọc ra những khách sạn còn phòng trống trong ngày với giá tốt nhất, đôi khi có ưu đãi lên đến 50%, khó tìm được ở bất kì nơi nào khác.

                    Sau khi hoàn tất đặt phòng và thanh toán, mọi thông tin sẽ được gửi về email và lưu trong mục “Đặt chỗ của tôi”, giúp bạn quản lý dễ dàng các giao dịch của mình theo thứ tự thời gian. Ngoài ra, chi tiết mã đặt phòng khách sạn còn có mục phiên dịch địa chỉ theo tiếng địa phương, bản đồ chỉ đường, và số điện thoại liên hệ, dành cho những trường hợp du lịch đến các quốc gia không nói tiếng Anh.</Text>

                <Text style={{ color: AppColor.Gray31, fontSize: 15, fontWeight: 'semibold' }}>Trải nghiệm người dùng thân thiện tại Finder</Text>
                <Text style={{ color: AppColor.Gray31, fontSize: 13, marginBottom: 10, marginTop: 10 }}>Với những tính năng ưu việt như thế, Finder mong muốn không chỉ đồng hành cùng bạn trên mọi hành trình, mà còn mang đến cho bạn những trải nghiệm người dùng thân thiện, cùng giờ phút nghỉ ngơi thoải mái nhất.

                    Giao diện của website lẫn ứng dụng Finder đều chú trọng vào sự tối giản, vừa tiết kiệm thời gian thao tác, vừa đơn giản nhất ngay cả với những người không sành công nghệ. Bạn có thể quản lý mọi thông tin đặt phòng của mình chỉ với một ứng dụng mà không cần bất kỳ giấy tờ rắc rối.

                    Thanh toán tại Finder cũng vô cùng đơn giản với 5 hình thức đa dạng: thẻ thanh toán quốc tế, ATM nội địa, chuyển khoản, thanh toán tại bưu điện và hệ thống cửa hàng có liên kết với Payoo. Riêng với thanh toán trực tuyến, tính năng FinderPay cho phép lưu thông tin cho những lần thanh toán sau. Để tránh các rủi ro khi giao dịch trực tuyến, thông tin thẻ của khách hàng được mã hoá và quản lý bởi một trong những nhà cung cấp dịch vụ quản lý giao dịch thanh toán trực tuyến lớn nhất thế giới thuộc tổ chức thẻ VISA - CyberSource.

                    Với Finder, bạn không chỉ đặt phòng khách sạn với mức giá tốt nhất, mà còn có cơ hội “bắt” được những ưu đãi hấp dẫn nhất. Các chương trình khuyến mãi liên tục được cập nhật tại mục “Ưu đãi hiện hành” và “Ưu đãi khách sạn”. Việc đặt phòng khách sạn giá rẻ giờ đây không còn là một nhiệm vụ khó khăn hay tốn nhiều thời gian nữa. Ngoài ra, để trải nghiệm du lịch của bạn thêm thú vị, bạn còn có thể đặt vé tham quan du lịch và tour giá rẻ, nhiều khuyến mãi với Finder Xperience trên https://www.Finder.com/vi-vn/activities.

                    Dịch vụ hỗ trợ khách hàng của Finder cũng luôn sẵn sàng 24/7 để giám sát mọi giao dịch, và giải đáp thắc mắc của khách hàng. Liên hệ trực tiếp với Finder tại ba cổng thông tin để sau: hotline 1900-6978, chat trực tuyến trên https://www.Finder.com/vi-vn hoặc gửi email về địa chỉ cs@Finder.com.</Text>
            </View>
            <TouchableOpacity>
                <Text style={{
                    backgroundColor: AppColor.Cyan, color: 'white',
                    paddingLeft: 10, paddingRight: 10, paddingBottom: 5, paddingTop: 5, margin: 10, borderRadius: 5
                }}
                    onPress={() => { setFullViewState(!fullViewState) }}>{fullViewState ? 'Ẩn bớt' : 'Xem tất cả'}</Text>
            </TouchableOpacity>
        </View>
    );
}