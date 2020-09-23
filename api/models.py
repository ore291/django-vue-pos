from django.db import models


def increment_trans_no ():
    last_trans = Orders.objects.all().order_by('id').last()    
    if not last_trans:
        return 'TRNS001'

    trans_no = last_trans.trans_id
    trans_int = int(trans_no.split('TRNS')[-1])
    new_trans_int = trans_int + 1
    new_trans_no = "TRNS" + '00' + str(new_trans_int)
    
    return new_trans_no






class ProductCategory(models.Model):
    title = models.CharField(max_length=255, unique=True)
    
    class Meta:
        """Meta definition for Products."""
    ordering = ['title']
    verbose_name = 'Category'
    verbose_name_plural = 'ProductCategories'

    def __str__(self):
        return self.title



class Product(models.Model):
  name = models.CharField(max_length=200, unique=True)
  price = models.DecimalField(max_digits=9, decimal_places=2)
  description = models.CharField(max_length= 300, default='description not available')
  quantity = models.IntegerField(default=1)
  category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products', default=1)

  # TODO: Define fields here

  class Meta:
    """Meta definition for Products."""
    ordering = ['quantity']
    verbose_name = 'Product'
    verbose_name_plural = 'Products'

  def __str__(self):
      return self.name



class Orders(models.Model):
    PAYMENT_CHOICES = (
        ( 'a', 'Card'),
        ('b', 'Cash')
    )
    trans_id =  models.CharField(max_length=20, default=increment_trans_no)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_mode = models.CharField(max_length=1, choices=PAYMENT_CHOICES, default='b')
    date = models.DateTimeField(auto_now_add=True)
    # TODO: Define fields here

    class Meta:
      """Meta definition for Transaction."""

      verbose_name = 'Orders'
      verbose_name_plural = "Orders"


    def __str__(self):
      return self.trans_id



class OrderItems(models.Model):
    product = models.ForeignKey(Product , on_delete=models.CASCADE)
    transactions = models.ForeignKey(Orders, on_delete=models.CASCADE, related_name='order_source')
    quantity = models.IntegerField(default=1)
    
    class Meta:
        verbose_name = 'OrdersItem'
        verbose_name_plural = "OrderItems"

    def __str__(self):
          return self.transactions.trans_id
