
4
placeholderPlaceholder*
dtype0*
shape: 
[
BatchNorm/betaConst*
dtype0*5
value,B*" z�n�{�nB~�n�{�nB|�n�|�nB~�nB~�n�
[
BatchNorm/beta/readIdentityBatchNorm/beta*!
_class
loc:@BatchNorm/beta*
T0
b
BatchNorm/moving_meanConst*
dtype0*5
value,B*" Ƅ�@�
(A�uC���AO��G���EMPA�d�?
p
BatchNorm/moving_mean/readIdentityBatchNorm/moving_mean*(
_class
loc:@BatchNorm/moving_mean*
T0
f
BatchNorm/moving_varianceConst*
dtype0*5
value,B*" ߌ@�5�A/P�Ef�D���O�7L�,B��?
|
BatchNorm/moving_variance/readIdentityBatchNorm/moving_variance*,
_class"
 loc:@BatchNorm/moving_variance*
T0
V
(BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
{
BatchNorm/moments/MeanMeanplaceholder(BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
O
BatchNorm/moments/StopGradientStopGradientBatchNorm/moments/Mean*
T0
\
-BatchNorm/moments/sufficient_statistics/ShapeShapeplaceholder*
out_type0*
T0
{
,BatchNorm/moments/sufficient_statistics/CastCast-BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
d
6BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
.BatchNorm/moments/sufficient_statistics/GatherGather,BatchNorm/moments/sufficient_statistics/Cast6BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
[
-BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
-BatchNorm/moments/sufficient_statistics/countProd.BatchNorm/moments/sufficient_statistics/Gather-BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
h
+BatchNorm/moments/sufficient_statistics/SubSubplaceholderBatchNorm/moments/StopGradient*
T0
�
9BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferenceplaceholderBatchNorm/moments/StopGradient*
T0
o
ABatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
/BatchNorm/moments/sufficient_statistics/mean_ssSum+BatchNorm/moments/sufficient_statistics/SubABatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
n
@BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
.BatchNorm/moments/sufficient_statistics/var_ssSum9BatchNorm/moments/sufficient_statistics/SquaredDifference@BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
E
BatchNorm/moments/ShapeConst*
dtype0*
valueB:
t
BatchNorm/moments/ReshapeReshapeBatchNorm/moments/StopGradientBatchNorm/moments/Shape*
Tshape0*
T0
�
#BatchNorm/moments/normalize/divisor
Reciprocal-BatchNorm/moments/sufficient_statistics/count0^BatchNorm/moments/sufficient_statistics/mean_ss/^BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
(BatchNorm/moments/normalize/shifted_meanMul/BatchNorm/moments/sufficient_statistics/mean_ss#BatchNorm/moments/normalize/divisor*
T0
u
 BatchNorm/moments/normalize/meanAdd(BatchNorm/moments/normalize/shifted_meanBatchNorm/moments/Reshape*
T0
�
BatchNorm/moments/normalize/MulMul.BatchNorm/moments/sufficient_statistics/var_ss#BatchNorm/moments/normalize/divisor*
T0
_
"BatchNorm/moments/normalize/SquareSquare(BatchNorm/moments/normalize/shifted_mean*
T0
y
$BatchNorm/moments/normalize/varianceSubBatchNorm/moments/normalize/Mul"BatchNorm/moments/normalize/Square*
T0
v
BatchNorm/AssignMovingAvg/decayConst*
dtype0*(
_class
loc:@BatchNorm/moving_mean*
valueB
 *���=
�
BatchNorm/AssignMovingAvg/subSubBatchNorm/moving_mean/read BatchNorm/moments/normalize/mean*(
_class
loc:@BatchNorm/moving_mean*
T0
�
BatchNorm/AssignMovingAvg/mulMulBatchNorm/AssignMovingAvg/subBatchNorm/AssignMovingAvg/decay*(
_class
loc:@BatchNorm/moving_mean*
T0
�
BatchNorm/AssignMovingAvg	AssignSubBatchNorm/moving_meanBatchNorm/AssignMovingAvg/mul*(
_class
loc:@BatchNorm/moving_mean*
use_locking( *
T0
|
!BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*,
_class"
 loc:@BatchNorm/moving_variance*
valueB
 *���=
�
BatchNorm/AssignMovingAvg_1/subSubBatchNorm/moving_variance/read$BatchNorm/moments/normalize/variance*,
_class"
 loc:@BatchNorm/moving_variance*
T0
�
BatchNorm/AssignMovingAvg_1/mulMulBatchNorm/AssignMovingAvg_1/sub!BatchNorm/AssignMovingAvg_1/decay*,
_class"
 loc:@BatchNorm/moving_variance*
T0
�
BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm/moving_varianceBatchNorm/AssignMovingAvg_1/mul*,
_class"
 loc:@BatchNorm/moving_variance*
use_locking( *
T0
�
BatchNorm/IdentityIdentity BatchNorm/moments/normalize/mean^BatchNorm/AssignMovingAvg^BatchNorm/AssignMovingAvg_1*
T0
�
BatchNorm/Identity_1Identity$BatchNorm/moments/normalize/variance^BatchNorm/AssignMovingAvg^BatchNorm/AssignMovingAvg_1*
T0
F
BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
X
BatchNorm/batchnorm/addAddBatchNorm/Identity_1BatchNorm/batchnorm/add/y*
T0
D
BatchNorm/batchnorm/RsqrtRsqrtBatchNorm/batchnorm/add*
T0
O
BatchNorm/batchnorm/mulMulplaceholderBatchNorm/batchnorm/Rsqrt*
T0
X
BatchNorm/batchnorm/mul_1MulBatchNorm/IdentityBatchNorm/batchnorm/Rsqrt*
T0
W
BatchNorm/batchnorm/subSubBatchNorm/beta/readBatchNorm/batchnorm/mul_1*
T0
[
BatchNorm/batchnorm/add_1AddBatchNorm/batchnorm/mulBatchNorm/batchnorm/sub*
T0
�
hidden1/weightsConst*
dtype0*�
value�B�2"�	Wno� �nBnB��m���n��o°RnBAnB8oB��n§CnB�=oB }nB0�n�j@nB��n��n�nB�Hn�^fnBnBV�nBƗnB"�nBpnBwAoB�fnB�_nB�n�ZenBn�n���nB�boB�Bn��bn��kn�&�n���n²AnB�On�ñn�H"nB��nB��n���nµ�nB��nBl3o�D�n��/o²�nBT+nB��nB�nB@�n�_Jn�*n���nB�nB4o���n��n���n�nB��nB�o�InB�PnB�Tn���mºo°�nB-ZoB�5n�`<n�4�mB�kn³>nB��nB�_n�o�n��nBunB�n�*�n���n�F�n(oB�tn�0�nBT�nB��nB�n�n��n�mBL�n���n��n�]nB�oBڴn��n���nB�m�#Wn�<�n�OSo�}�n�>nB�nB�?oB��nBX�n��)oB��nB��n�goB�m�t�nB�nB��n¤dnB1�nB�OnB�nB��nBܜn�n�n�n��rnBD�nB��n�n�jEoB�_n���nBto��n�:�nBF�n�xn�v�nBi�nB�
nB`�nB4OnBC�mB�5n©�n��n¬oB�QnBp�m���m�
�n�t�n�q�nBD~nBɧn�{oB~Jn-oB�nB�knB�`n��%nB6:o½�n��o��nB��nB��mBB�nB�JoB��n���nB��nB�wnB�oº�n»nBL]nB�n�n�/n�m�nB
�nBa:nBFoB�8nBK�n�;�n�o�n�y'nB��m��o��n���mB��n�$�n��n¢oB��m���nB��nB6�n���n��!nB�nBܶn�,`nB�o��^oBƵnB,bo��@nBM�n�v�nBnB��n�8un��nBP�nBn/nB�?nBB�nB�un�9�n��nB�QnB�nB��n���nBP�n KnB�n���mB��nB}!n�J�nº�nB�wn���n³{n�)znBD�nB��nGnB��n�Jo��n�[CnB�oB�Nn�{�n·�n�S�n�y�nBRo�đnBk~nB�gnB?�n�F.nB$o�ĹnoB�Mn�L�nB��nªoB��nB8nBN7o��n�P�n��rnBA�n�p�nBiwn��WnBn���nB*VnB��n���m�p�nBf�mB[YnB��nB�)n¡�nB��nB�ZoB�n²jnB�
n�$@n��nB��n�9o�NAn�O�nBx2o�
�n� �m��nB�sn²Xn�۸n�3nB�%nB�&n�<�nBEnB�n�l�nB-�n�S�n�{�nB�nB��n�R�nBFn��n�6�n�?�nBֈnB�nB��n��nB��nBFNoBPoB��nxnBx�n�q6o��nB��nB�pn��nB,0nB�n/o�D�n�nBW�n�tWnBNnB��nBL�nBM�nB�AoB1_nBؚnB��nB�nB+�n��>n���n�b�n�ln�\2nBE�nBb�n-nBXo�(�n�!�m�|9n¨�nB�n�T�nB�oB��nBooB�n��0n¤�nBezn3oB��mBe�nBGhnB �nBT�nº�nBHnB�n°�n�Sn��n��n¨YnBǟnBRn�
^
hidden1/weights/readIdentityhidden1/weights*"
_class
loc:@hidden1/weights*
T0
�
hidden1/biasesConst*
dtype0*�
value�B�2"�{�nB~�n�|�n�{�n�z�nB}�nB|�nB~�nB~�nB{�n�~�nB��nB}�nB~�n�|�n�|�n�{�nB|�n�~�nB|�nB~�nB~�n�}�nB~�n�~�nB{�n�{�nB|�nB|�n�~�n�{�nB|�nB~�n�|�n�{�n�|�nB|�nBz�nB~�nB~�nB}�n�~�n�~�n�~�nB~�nB~�nB{�n�~�nB|�nB|�nB
[
hidden1/biases/readIdentityhidden1/biases*!
_class
loc:@hidden1/biases*
T0
x
hidden1/MatMulMatMulBatchNorm/batchnorm/add_1hidden1/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden1/addAddhidden1/MatMulhidden1/biases/read*
T0
*
hidden1/ReluReluhidden1/add*
T0
�
BatchNorm_1/betaConst*
dtype0*�
value�B�2"�~�nB~�nB~�n�|�n�{�n�|�n�z�n�~�n��n�~�n�~�nB|�n�|�nB~�nB}�nB}�n�{�nBy�n�|�n�y�nB{�nB|�nB~�n�x�n�~�n�z�n�y�nB~�n��nB~�nB|�n�~�nB�nB~�nB~�nB|�nB|�nB}�nB|�n�z�n��nB|�n�~�nBy�n�x�nB|�n�~�n�~�nB~�nB~�n�
a
BatchNorm_1/beta/readIdentityBatchNorm_1/beta*#
_class
loc:@BatchNorm_1/beta*
T0
�
BatchNorm_1/moving_meanConst*
dtype0*�
value�B�2"�l�4LhHB�D�A(��A<�4'��E�5��4��B0��E~��4��4_��4�GBdd�F�<�4A|4?�ZFpw�4��ET1�4�҉4>�\F��ZFd>4�!&B'�4kӁ4�n14�T�FH��BH�Bb>�4h�ZFu,BV��4��E�	D4�3]F3	�B`�B@}�F��F��a4w�Eb�Eh��EĹ;40��4���E
v
BatchNorm_1/moving_mean/readIdentityBatchNorm_1/moving_mean**
_class 
loc:@BatchNorm_1/moving_mean*
T0
�
BatchNorm_1/moving_varianceConst*
dtype0*�
value�B�2"����7���E,�E�E��7X��F� �7���7���E�9�Fnb�7>5�7y �7?zfE�4�GMz�7B�7�^�Fh�7�V�F���7�K�7_!GL��F� �7>�E���7]'�7���7�6JG=�hF���E���7v�>Gr=cE�Y�7lb�FY"�7c��FhəF �E�LJG���G�'�7WΚFA��F>�FTP�7�E�7u��F
�
 BatchNorm_1/moving_variance/readIdentityBatchNorm_1/moving_variance*.
_class$
" loc:@BatchNorm_1/moving_variance*
T0
^
0hidden1/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden1/BatchNorm/moments/MeanMeanhidden1/Relu0hidden1/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden1/BatchNorm/moments/StopGradientStopGradienthidden1/BatchNorm/moments/Mean*
T0
e
5hidden1/BatchNorm/moments/sufficient_statistics/ShapeShapehidden1/Relu*
out_type0*
T0
�
4hidden1/BatchNorm/moments/sufficient_statistics/CastCast5hidden1/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden1/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden1/BatchNorm/moments/sufficient_statistics/GatherGather4hidden1/BatchNorm/moments/sufficient_statistics/Cast>hidden1/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden1/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden1/BatchNorm/moments/sufficient_statistics/countProd6hidden1/BatchNorm/moments/sufficient_statistics/Gather5hidden1/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden1/BatchNorm/moments/sufficient_statistics/SubSubhidden1/Relu&hidden1/BatchNorm/moments/StopGradient*
T0
�
Ahidden1/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden1/Relu&hidden1/BatchNorm/moments/StopGradient*
T0
w
Ihidden1/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden1/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden1/BatchNorm/moments/sufficient_statistics/SubIhidden1/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden1/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden1/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden1/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden1/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden1/BatchNorm/moments/ShapeConst*
dtype0*
valueB:2
�
!hidden1/BatchNorm/moments/ReshapeReshape&hidden1/BatchNorm/moments/StopGradienthidden1/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden1/BatchNorm/moments/normalize/divisor
Reciprocal5hidden1/BatchNorm/moments/sufficient_statistics/count8^hidden1/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden1/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden1/BatchNorm/moments/normalize/shifted_meanMul7hidden1/BatchNorm/moments/sufficient_statistics/mean_ss+hidden1/BatchNorm/moments/normalize/divisor*
T0
�
(hidden1/BatchNorm/moments/normalize/meanAdd0hidden1/BatchNorm/moments/normalize/shifted_mean!hidden1/BatchNorm/moments/Reshape*
T0
�
'hidden1/BatchNorm/moments/normalize/MulMul6hidden1/BatchNorm/moments/sufficient_statistics/var_ss+hidden1/BatchNorm/moments/normalize/divisor*
T0
o
*hidden1/BatchNorm/moments/normalize/SquareSquare0hidden1/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden1/BatchNorm/moments/normalize/varianceSub'hidden1/BatchNorm/moments/normalize/Mul*hidden1/BatchNorm/moments/normalize/Square*
T0
�
'hidden1/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_1/moving_mean*
valueB
 *���=
�
%hidden1/BatchNorm/AssignMovingAvg/subSubBatchNorm_1/moving_mean/read(hidden1/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_1/moving_mean*
T0
�
%hidden1/BatchNorm/AssignMovingAvg/mulMul%hidden1/BatchNorm/AssignMovingAvg/sub'hidden1/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_1/moving_mean*
T0
�
!hidden1/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_1/moving_mean%hidden1/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_1/moving_mean*
use_locking( *
T0
�
)hidden1/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_1/moving_variance*
valueB
 *���=
�
'hidden1/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_1/moving_variance/read,hidden1/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_1/moving_variance*
T0
�
'hidden1/BatchNorm/AssignMovingAvg_1/mulMul'hidden1/BatchNorm/AssignMovingAvg_1/sub)hidden1/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_1/moving_variance*
T0
�
#hidden1/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_1/moving_variance'hidden1/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_1/moving_variance*
use_locking( *
T0
�
hidden1/BatchNorm/IdentityIdentity(hidden1/BatchNorm/moments/normalize/mean"^hidden1/BatchNorm/AssignMovingAvg$^hidden1/BatchNorm/AssignMovingAvg_1*
T0
�
hidden1/BatchNorm/Identity_1Identity,hidden1/BatchNorm/moments/normalize/variance"^hidden1/BatchNorm/AssignMovingAvg$^hidden1/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden1/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden1/BatchNorm/batchnorm/addAddhidden1/BatchNorm/Identity_1!hidden1/BatchNorm/batchnorm/add/y*
T0
T
!hidden1/BatchNorm/batchnorm/RsqrtRsqrthidden1/BatchNorm/batchnorm/add*
T0
`
hidden1/BatchNorm/batchnorm/mulMulhidden1/Relu!hidden1/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden1/BatchNorm/batchnorm/mul_1Mulhidden1/BatchNorm/Identity!hidden1/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden1/BatchNorm/batchnorm/subSubBatchNorm_1/beta/read!hidden1/BatchNorm/batchnorm/mul_1*
T0
s
!hidden1/BatchNorm/batchnorm/add_1Addhidden1/BatchNorm/batchnorm/mulhidden1/BatchNorm/batchnorm/sub*
T0
�N
hidden2/weightsConst*
dtype0*�N
value�NB�N22"�N�n�`�nB��n�fJn�unB�nB�dnB��n�o²!n�nB<�nLnB\NoB_bn�RMo�J~nXn�,�nBT<nB�=nB��m�
�nB,o�X�n���n�rnB�]nB��n��oB}Un���m�iYn���nBBInB[An��tn�n�nB7nWnB>�nB|nB8�n�n�`qn�|�nB/So�}�nB�nB��nB�{n�:n�@�nOn���mB��mB9hnB�nB~o���nB}}n�d�nB��n¯doB�n��n��n�bzn©�n�� o�WdnB9�nB4�n��]nB�fn��
oBp�n��cn���mB2nB4xn�1�nB�oB8�n��7oB��n���nBE�m��n;n�eoBt�n{nBn�n�Z'n�2�nª�nBSn�:�n�0�nBQnB�o��`n¸>n�n��nB�nB�
nB�dn¿�n�[[nBo?nB�9n�t�nBh�n��*oBC�nB~�n���n�o��oB��n�R3n��mB<%n���m�n�Vn�joB�oB^�n���mB"oB��ndn���nB`�mB$�n��n�B<nBp�nB�;nvnBZ~n£�n�zxnB@�n���n�֌noB�Rn��nBvnB;�n��nB*o�)PoBd�nB�.oB�nB Un�nB�n���nB��nB��m���n¤�n�<oB��mB�2oBv�nB��nB�Yn®"nBF�n���nB�nB��nB�RoB�wnB:�n��sn���n���n¶�n�V�n�0�n�$�n�X�n�2nB`�n� �n�q�nB�~n�n�>anBt�n��nB�an¦VnB�Pn0o��nB<�m­�nB��n��cnHnhn%o�nB��n��n��n�b-nB��n�7FnB�jn�O�n´LnB�inB��nB�znB�Rn¦�nB�n»Zn�̶nB An��'n�^�n�B�nB�.n�v�n�nB�0n�n�J�n�
�n��kn��|nBU�nBƹn�H�n�|&o���nB${nB4�n��{n�4pnBi�n�g�nB0�m lnB�Un��Ln��PnB��nBN�nB�m��oB�n���n���nB��nBf�n�*�nB��m�:�n��n��o���n�رnB6�m��nB�(oBY-n��nByn�l�nB1GnB:�nB�
nBoHnB�1nB�vnBt�m�\nB Pn�n0no�G6o£MoB�|n��n�G0nBm'o�pxnB��n�nB`�n½�nBX�nBX&nB-nB�In�*�n�T�nB�ynB�9n�mB(�m%n��_n¬]no��,nB3�n.o��nª�n��n� �nBh�nBنnBB�nBw�nB�nB� o�ŸnB��n�:�n�t%nBS)n�/HoBh�n²pn�D�n�A�n <n��Yn���nBi�nB�"n�0:n��|nBzSo�/�nB�n�y�n�b�nBX o��#oBtoB*�nBp�mB�nB�mB�oB��n��nB'�n­_nBwSn�\n³~n�\�n�nB�Xn�(@oB�]nB�nB�8oDnB4kn�mB��nB��mB^~nB%5nBYCn��3n�|�n�^�nB2'n��n�6�n�t�n���n��oBVZn��oB�nB~nB2So��WnBl�m��~nB�n�#o�~in�*&n�F�nB�anB8oBZoB�Qo���n��rn�cPn���nB�nB�DoB0�n�Vn�d1n�]�nBB�nRnB��nB��nB�nB�n��gn�K�n�l�n�J�nB��n�8n�:�n��<o���n�Zo�RLoB�n�کn�enºzn�~�n�b�nB��nB@oB�n�N�n��bo�p�nBn�x�nBBkn��No�|hnBrkn��wn�r�n�~^oB �nB��nB�n½�n�$nB^jn�)oBPoB��n���nB\nB�0n�3�nB��nBDn��n��n��No��@n�w�n�nB\�nB��n���nB�bn�vOn�(�nnB^�nBXo�86oB�JoBa.nB6unB�unB��nB�ln®�n��*nBD�nB��n�Hcn�8�n�ߩnB)�n��KnB�{nBOOn½oB�{n¥�nBK�nB�AoUn�p�nB�n��nBȣnB�oB�%oº5o�Bn�I�nB}nB�o��&n���nB`�n�bMn�1gn�C�nB,�mB�noB�"n�S�n���nB�EnB��nB�un�oo�R�nB��nBz}nB�nB	�nB��n��	oB�n�&oB
Rn�_�nBN�nB��nB
�n�
�n�گn�nBG7nB<�nB�_n�@o�4�n�R{n½�n���nB@�n�2o�n�B,o�n���nB��n��tn�,oB�ZnB�n�RoBcFn�gJnB�o��Hn��:nBxnB$�n�7�mB�AoB��nB�nB
IoBZ}nB�pn¶�m�NWn�@hnB_�n���nB
�n��!n��jn��nB��n��n�S�nB�knB�en±�n�r�nB�n��yn��mn�j�n���nB�Rngn°�n�zn�7�m�JIn���nB�nB>nB�.nª$n�Ton�W�nB�So�4`nB�nBH�nB6fn�{nBd2n�LnB8�nB�n�hRn���n�.n¢�nB��nB"n¤%oB�Rn��Nn�nco��6oB�n�@qn3n�RLn��nB��n�H�nBo�nB�m�$�n�4�n�nB��nB�7oB�vn��An�N�nBH[nB��nB+o¡vn�E n��bn�ȑn�ģnB%n�^�m�nB�o�
6n��DoBS?o���nB��n�m�n��nB� nB��mBڋnBp�nB�o�Xrn�4�nBԍnBT�n��cn���mB2}n�r�n�>[nBB$n��m�n�_n²�n��?n�R nB�ZnBn�,o�4Tn�j�nBboB�oBz=nB�o���nBwUo�~enB�n��|nBt�n¬�n�.�nB(�m�}[nB7n��mB�^n�,anB��n�6	oBUQn�nB7fnB��n�X?nB�Dn��n�kan��nB�o��m2nB�o�Po�d�m��nB�n��BnBƢn���nB.nB��mB�Hn�`�nB@cnBl,nB�n5nB`�nB�n�߁n¦|n�n��WoB%nBabn�d oB)o¥�n�J�m�߰nB6�n�>�nBasn-o��n�nB��m��nBZ7nB`�nB�oB�nBĖn�
�n��{nB�n�n¨oB�Gn¾|nB�o¶�no�n�5o���n"oB��nBv�m� �n�|n�hNo�Ƿn��nB�nB'�n�*�nByHn��n�&/o�:nB��mB3Pn�Ȼn�-oB��n��oB?�nB��nB�knB��nBˉn�rAn�n¤�n§�nBHHo��nB�/o°�m�Z�n�x�m�3In��nBz(n��nBȶnB{�m�0Xn��=nBwnBY�n�pnB��nB,�nBтnin�NVn�nB�oB�Qo§.oB&�n�NoB��m�D�n��m��n�"oBY�mB�-nBx<nB�znBp�no�q*oB�n���mB��n���n�o�j�n��2nB�noBXn�nB8=n���n��rn�mnB�oB�kn��nB<�n»4o#n£�nB^�n�P�n�v�nB�1n���n¼�n��nB��n�/]nB8�n�-&n�	�nB��nBekn�i�mB�nBn`nB��nBp�nB�5n���n���n�$oB�LnBH�n��n���nB�Pn��_nB�nB��nB��nB�{nB$o¦nB~xnB��n��nBabo�n n½gnB��n§%nB��n�zoToB҂n���nBJ�nBuin n�5�nB��nB>6nB��nB�[nB��nBGZn�pPn�hn���nBD�mBp'n��nB*|n�InB5RnB�o�6�n��0nB;�n�$�nB��nB��menPnB0�n­o¡Qn£�nBܙn���nB�nB;�nBD%n��oB�jn�-Vn�BnB��n±�nB#o��dnB	�n�^�nB�n��|n��2oBF�nB�n�XnB��nBd�n�|�nB �n�n�n��tn�oB�BnBun��oB�yn�oB��nBKnB <n�nB^n�n��8nBLnB^nB��nB�ln�Q�nB�oB�
o�4�nBʈn�{nB�Zn��nBK,nB�n�co�Pun��nB�n��oBs�noBF�n�nB��n�oB�SnB��n�6�nB	cn�_!o�h�nBPXoB�xn�@tn�:n�To(n�N�n�NDoB� o�H�nB?�n¯�nB��n�B�nBo�z o��nB��nB$�n��0oB�ao�LjnB�jnBhLnB�+n� �nB6�m�/oB��nBlnB|xn��en�6�n�L�nB��nB�@o�R�nBQ�n�P8n�)nB�fn>nB��nBNMn��GnBj�n®nB/�n�nB6�nBeun�xkn¢�nB��nB܄nB��nB��n´�n��nB�}n�nB5n��Cn�[�nBt�nB��n�Q�n�"1n�ʹnB�_nB��nB�Wn���n¾enB�Ko�ęn���nB�m�pn�Y&o��pn�~�n�oB��nB&^n �nB_�n��nB�JnBxJn�l�nBZ[nB�nB��n�R�n¢�nBRo�v�m���nBun�Q�n�n�6�n��o�m�g�n���nBD�nBM{nB�n�Upn�R�nBbo:n�r�nBoBrKo��&o�2JnB�nBL�nB�n�gn�PnB��nBqn�nBJ�n��pn��n�on���n�Q�nBYmnB�en®�nB�(o�؎nB@Cn�DoB�0n�nB��nBR�nB�\n�#nB@~nB��n��jnB�nB�^nB;n��Yn�8�n�/�n�pbn�n¤-nB��mB��nBV�n�n�nB�qn�nBR&o¢�nB��n�F�n���m�L<nB�nB�]oB��n¨�nB}nB�<n\n���n�O�n�T�m��enB,�n��nB��nB�On·]nB�n�nBa�nª�nB�dn�|oB��n�ߛnB�wn�F�nBXnB�)oB nn��*oB��nB�9o��Bo��sn�8�n>o�n��coB��n�ބnB!o�ڻnBF�n�z�nB��m!n��o¶�n�~oBɢnB�nBV�nB��n�H.n�2�n��sn��fnBU�nB�nB��n��Pn/o�n�nB�n��m��nB*�mB2�n�D.nB��n�~Zo�m�n�nB�n�w$o���nB�=oB�;n�WnBz�nBdLn�҂n�~en�2cn�n�nB�nB�nB�n�nxn �n��NnBdnBxyn�v.o��n��o�^n���n�)�n��nB9KnB��n���n»�n�DvnB�n�� o�d?nB�n�b|nBNnB��m&oB^�m�p�nB��nVnB�oB��n�n·oB�nBM�n��hnB��nen�ĄnB>oB[znB��nB<;oB��n�m�0�n��hnB��mBj$oB(�m¡�nB2.oBb�n�*�nBpxn�AnB0@o��:o¢�n��nB�nB��nB�Jo��nB��nB��nB0�n�T�nB��n°�n��vn°�n�	�nµ�nBC�n¥kn��nB��n^nB��mBv�mB�nBN�mB�oB��n�n½#nBh<o�n�ӾnB~�m`n��n���n�2�n�rqn�^Anin��nB$�nB��m�?�n�n��o���n��@nB�nB�\nBH�nB;n��nB\�m���nB��nBa}nB�nBJ�mB�n�BnB��n�9�nB�n�+�n�
ZnBH�n�j�nB�n�6~n��n��=n��o��nB6#o�ʪnen�xinB��nB"�nB4�nB��n��n�*KnB��nB�9nBV�nB �nB1�nB�Go4n�J�nB� n�nB,�n�>�nBo�nB|To�n°�n��nBo�K�mB�n�h�n���nB�Kn®�n¤�nBT2n½Bn�,�n�xanB�ln�q�nB�n��n�PrnB�*nB bnB��nBn�nB�oB�nBloBCBo��n���nBpzn��mn¨PoB8�mGoSo�d\n�"�n�Hwn�� o+oB2nB_jn�n�:nºo���nB��n�:$oB��nºjnBAo¦'o��PnBlbnB1�nBn�nBt�mB�oB��n¹�nB�o�8�nB��n��m�n�lco��nB#o���nB8rnB�nB�n���nB�n��snB��nB��n���nB9mn�	n�]�n���nBGSn�Ǆn]o�
rn�B�n��)n¼enB*zn�[/nB��n�-�nµn��%nB�\o���nB]�nBB�n�<,oB9�nBvynB�oBF�n�W n��]oB�nB�enBv*n���nBi�nB&�nB�!nB��n¦in��m�ɶnBʝnBpZnB^oB��nBP�m�t�nBT�nB�nBRVnB�kn���nB`>nB_n�p8n��nB1�nB�gn���n�
�n�zXn�on¯oB�n�n�[oBu�n�!.n�n��n@nB��nB��nB�enB�|nB��n�
�m��An��lnBޖnBnB.8nB�9o��un�i�n�ߖn¦�n��nB��nBAo[n��DnB�$o��An�\�n�5an¸�nB(�nB�6nB"n�$�nB�zn�?�nB�nB�Eo�t�n�'oB�nBVnB~bnBV	oB��n¯�n®Ro�$�nB��mªoB��nB�oB
�nBL�nB�n�̕n���n��n�oB��n�)3nB�qnBysn�o��n�0`nB�	o�2�nenB�jn�H
oB��nBUoB\�nB�yn�1CnB�nBHxnB{LnBIn�F�n�nBVXnBI�n��Un��n�ױnMnB+oB��nBd�nB��n�9nB�|nBo��nB.�nBnBܺn¿�nB�}nB�
oB~�nB��n!n�>�nB��mB��nB>enB�nB+o�n��nB
nB�.nB7oBtn�sSoB��n��}nB��n�n�nB�MnB�nB��m�z�n�6�nB�n�2�mB�>nB4�nB��nB�vn¸Pn��nBS?oB��n�C(nBx+oBT�nB��n½ZnB�oB�#oB��n¯]nBb^n�F|nB�&o�^�nB`�n¬wnB��mB�8oB�nB�oB�n�nB�zn´Bn�X�nB�n�Dn�ZRnB�MnB�xn�`n��+oB��nB�oB��nB1AnB��n��3oBx�n�K#oB��nB�&o�C�nB��n��nB'�n� oB��n�bZo�>!oB�unB�m»KoB��nBNo�$PoB�^nB]�nB�sn�YEnB=onB�4n�'4oB�$nB�4nB�EnB��nBNmn�n��Jn°�n�PoB^�nB�OnB�pnB|{n�6�m��+n�mB��nBzZoB��n�n��n�ޔn¿�nBJnBongnBu�n�^�nBj�mBn��Zn�}9n�5Vo�nB�n�Ѡn��|n�l�nB��nB�	oB(�nB�ln��Yn�&�n�
Jn-nB��nB�HnB��n¶?o¨�nB�RnB�oB�8nBP�n��o�zn���n�~nB�'nB`�nB�nB��n���m�n�O�nBN�nB>�n�[%o�7o�@�n�oon��xnB�_n�0n¨;oB�VnBP�n�(�nBq�nNo�")o±�n��PoBbn=n�^�nB��nB�^n��"oB��nB��nB�{n�u8n�nB��nB9�nB��nBy�n2n�,o���nB��mB^on`o��`nBean��kn���nB��nBF�nB�!nB�rn���nBJ�nB��nnB�n�I�nB�Fo��n¦oB0 nB�nB�.n��~nB-�n��JnB��n�z{nB/�n�unB�Hn�D2nB��n� n�D�nByznBp�n¨|nBj)nB�n�$�n�rSo�tdn�U#n�1 n��4nB �n��nBK|n��nB=�n�O�nB^n¢"n¼'o«bo�+�n�PynB�nB�nB��nB:�nB�nBw�m�nB��n�z�nB��n��on��dn°o��3nB��n�B�nB"[nB��nB3 o�޲nB��n�3dnBh.nB~�nB�UnBҫn���n�FJn��n�<xnB�on�n��nun��cnB;�m�ʩnB��n�Jn�΀n4oBd�mnB�jn³�n@n��en���nB>�n���nXn��o&o�R�n�F�n�h!o¦#n���nB��n¬RnB
nB��n��n�B|n��nB�PnB<�n��nB�,nB�nB؂n¤�nB�Hn�~�mB�nBP�n�^�n�{=n�ީn{nB�nB�So�Ln���n�9�n��Mn��KnB%�n¾�nB`�n�Po�N�nB�Bn�U�mB�oB�Mn�r�n�snB�m�C�nB��n�Ȉn��<n¡cn�|�nB�EnB��n� �n���n�nB�QnB�pnB~
o�a�n§�nB@nB��m�NnBfn¨>nB�n�\[o0nB�<n¸�nªFnBQnBl6o���n�UoB/�nB��m}n�X�m��n�T!nB�nBԋn���n�v�n�o?nB��n�\_nB�'oB�znB�.nB�mnB��nBnn�P^nB|jnB[�mB�9oB��n�nªnB��nB"XnB��n¤�n¬6n�;�nB��nB��n���n�)n�n�e�nB�nBJ�nB�xn���nB~ynBB�nB�@nBCYnBQn�g>nB*ynB��n¸DnB�2oBd�nB>-n�n�n�v�mBf�nB(1nB$2nB$�nB�1nB�n·�mB��nB9nB��noB(�n�`�nB�nBǼnB2-nB��nB�Xn�u�nB�n�F�nB��m¡PoB3�n�wUnB��nB�Ln��dn���n��n�L$oB��n��oBW�n�!�n��anB��n¬�nBfMnB��n�(�nB��nBĺnB��nB�nBfxnBb�n���n�n¦�nB�nB��nB-n�7�nB��nB� oB�n�ipngnB��nB��nB��n�f�nunBlBoB��nB�Bo�H�nB�,n�bn��n��n¹Nn�d8nB�6n°�n�ܛn���n���nnB�!nBT!nB�[nB��nBE�n�c�n�nBk�n noB�n�n¾6n��o�dn¸n�~)n©Go��hnBoB��n��Vn��;n���n���n��BnB�o�X+oB�nB#%o�e�nB�3o�șnB�+oB�nB%nB)�nBʫnBEnB��nB��nB�7n�oRnB��n�LDnB�[nB��nB6|nB�NoB�Wn��KnB|un���n�f^nBGo�<�nBzo��1o©�n�6/n­mn�qn�?�n��n¶�n��n���nB9�n�M�n��nBПn�a�nB�4n��5n�lonB�nB�oB��nB�tnB��m�§nB�&nº%oB�anB��nBU�nB��nB:(n���mBx�n��lnBX�n��gnBۨnBιnBl�nBq^n¸Rn�&n¨�n�nBuQnBr�mB��n�Rn�:o��,nB4nBh�mBr�nInB�oB�]nB��nB!ZnB>`oB�Fo��n�B�n�2tnBe nBdgnBA�n¬�nB�.nB��nBcoBp�n�9�n�Sn�KnB��nB,nBo�?�n§gnB�%nB�oB3�n¸�n°7o��Eo��Uo�nBI>n�n��nBO�n�c]n�,�nBJ�n�n� yn«7n��nBF3oBWnB�NoBU�nB�#n�nB��nB�rnB�Yo�on·�nB�+o��Qn��GoBt�n�tvn�^n��`n°�n�M�n�ЋnB9n¥�nB�nB�(o�HnB�o��$nBԷnBMoB�nB��n¶�nB�9nB`!nB_2nBvo���nº(o��{nBi�nB�=nBInBX�nBtntnB�n�2nBtcnBorn�nB�o�n°�n�Do���nB\�n�L�n���nB��nBljnBqnB�_n�*dn�AEoBf�n©�nB4�n�
vn�nnB��nB��mB��nB�nB�OnB�XnB[�n�nBȇnB:�nB��nB�fnB>}n´OoBj�n�nB:pn�?�n�J�nB�}nB�nB~3n��n�<+n��n�AnBA�mB�nB�rn���nB^�mB��n�FHnB�nB@8n �nB0�nB��n�nB�#nB��nB
hn��jn���n�֑nB��nB��nB�1nB�%oB *oB.n�
^
hidden2/weights/readIdentityhidden2/weights*"
_class
loc:@hidden2/weights*
T0
�
hidden2/biasesConst*
dtype0*�
value�B�2"�z�nB{�nB�nBr�n�|�n�~�n�|�n�|�nB{�n�|�n�|�n�z�nB|�nB�nB~�nBx�nB|�nBz�n�|�n�|�nB|�n�|�nB|�nBz�nB{�n�x�n�x�nB|�n��nB|�nB{�nB|�nB}�n�~�nB�n�x�n�n�nB}�nB}�nB}�nB{�n�z�nB}�n�{�nB|�nB|�nB��nB�nB{�n�~�n�
[
hidden2/biases/readIdentityhidden2/biases*!
_class
loc:@hidden2/biases*
T0
�
hidden2/MatMulMatMul!hidden1/BatchNorm/batchnorm/add_1hidden2/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden2/addAddhidden2/MatMulhidden2/biases/read*
T0
*
hidden2/ReluReluhidden2/add*
T0
�
BatchNorm_2/betaConst*
dtype0*�
value�B�2"�{�n�z�nBx�nB~�nBx�nBy�n�r�n�{�n�{�n�z�nB|�nB|�nBy�n�|�nB|�nB{�nBs�n�~�nB|�n�y�n�~�n�}�nBy�nB|�nB{�nB{�n�|�n�}�n�|�n�|�n�~�n�|�nB~�nB{�n�x�nB~�nB~�nB�n�~�nB|�nB|�nBx�nBy�nBz�nB{�nBy�nBy�n�{�nBv�nB�n�
a
BatchNorm_2/beta/readIdentityBatchNorm_2/beta*#
_class
loc:@BatchNorm_2/beta*
T0
�
BatchNorm_2/moving_meanConst*
dtype0*�
value�B�2"��� 5���E��E|�B�E5a<5�;�F�!Y5�&|5A5��G��D5PS]FB��F=�\FD5[F��\F�Z?5_5��Ff5�4�5J�B@q]F�\e5�}�EG�\5��BĽ35E�F���E�\�E���E��Eȁ�Fm��E��\F�%GOd�F�$%Gl#�E��Fm�4:U5!�E�^%GQ�4��wGzy�4�g�F
v
BatchNorm_2/moving_mean/readIdentityBatchNorm_2/moving_mean**
_class 
loc:@BatchNorm_2/moving_mean*
T0
�
BatchNorm_2/moving_varianceConst*
dtype0*�
value�B�2"�p��7�GH^��H��F���7T��7d: H���7:;�7���7�IcGI�7�Hg�G~vH�u�G��WG���7�E�7��H��7�h�7LH�F�j|GO��7u��G$��7���E�{�7�hQG���G�-�F$��Ff��G�F�F S
G;��Gjz�G��*H�NH��KGĻG"�7в�7�RG�2�F��7mYG�(�7ґG
�
 BatchNorm_2/moving_variance/readIdentityBatchNorm_2/moving_variance*.
_class$
" loc:@BatchNorm_2/moving_variance*
T0
^
0hidden2/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden2/BatchNorm/moments/MeanMeanhidden2/Relu0hidden2/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden2/BatchNorm/moments/StopGradientStopGradienthidden2/BatchNorm/moments/Mean*
T0
e
5hidden2/BatchNorm/moments/sufficient_statistics/ShapeShapehidden2/Relu*
out_type0*
T0
�
4hidden2/BatchNorm/moments/sufficient_statistics/CastCast5hidden2/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden2/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden2/BatchNorm/moments/sufficient_statistics/GatherGather4hidden2/BatchNorm/moments/sufficient_statistics/Cast>hidden2/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden2/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden2/BatchNorm/moments/sufficient_statistics/countProd6hidden2/BatchNorm/moments/sufficient_statistics/Gather5hidden2/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden2/BatchNorm/moments/sufficient_statistics/SubSubhidden2/Relu&hidden2/BatchNorm/moments/StopGradient*
T0
�
Ahidden2/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden2/Relu&hidden2/BatchNorm/moments/StopGradient*
T0
w
Ihidden2/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden2/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden2/BatchNorm/moments/sufficient_statistics/SubIhidden2/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden2/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden2/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden2/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden2/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden2/BatchNorm/moments/ShapeConst*
dtype0*
valueB:2
�
!hidden2/BatchNorm/moments/ReshapeReshape&hidden2/BatchNorm/moments/StopGradienthidden2/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden2/BatchNorm/moments/normalize/divisor
Reciprocal5hidden2/BatchNorm/moments/sufficient_statistics/count8^hidden2/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden2/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden2/BatchNorm/moments/normalize/shifted_meanMul7hidden2/BatchNorm/moments/sufficient_statistics/mean_ss+hidden2/BatchNorm/moments/normalize/divisor*
T0
�
(hidden2/BatchNorm/moments/normalize/meanAdd0hidden2/BatchNorm/moments/normalize/shifted_mean!hidden2/BatchNorm/moments/Reshape*
T0
�
'hidden2/BatchNorm/moments/normalize/MulMul6hidden2/BatchNorm/moments/sufficient_statistics/var_ss+hidden2/BatchNorm/moments/normalize/divisor*
T0
o
*hidden2/BatchNorm/moments/normalize/SquareSquare0hidden2/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden2/BatchNorm/moments/normalize/varianceSub'hidden2/BatchNorm/moments/normalize/Mul*hidden2/BatchNorm/moments/normalize/Square*
T0
�
'hidden2/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_2/moving_mean*
valueB
 *���=
�
%hidden2/BatchNorm/AssignMovingAvg/subSubBatchNorm_2/moving_mean/read(hidden2/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_2/moving_mean*
T0
�
%hidden2/BatchNorm/AssignMovingAvg/mulMul%hidden2/BatchNorm/AssignMovingAvg/sub'hidden2/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_2/moving_mean*
T0
�
!hidden2/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_2/moving_mean%hidden2/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_2/moving_mean*
use_locking( *
T0
�
)hidden2/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_2/moving_variance*
valueB
 *���=
�
'hidden2/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_2/moving_variance/read,hidden2/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_2/moving_variance*
T0
�
'hidden2/BatchNorm/AssignMovingAvg_1/mulMul'hidden2/BatchNorm/AssignMovingAvg_1/sub)hidden2/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_2/moving_variance*
T0
�
#hidden2/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_2/moving_variance'hidden2/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_2/moving_variance*
use_locking( *
T0
�
hidden2/BatchNorm/IdentityIdentity(hidden2/BatchNorm/moments/normalize/mean"^hidden2/BatchNorm/AssignMovingAvg$^hidden2/BatchNorm/AssignMovingAvg_1*
T0
�
hidden2/BatchNorm/Identity_1Identity,hidden2/BatchNorm/moments/normalize/variance"^hidden2/BatchNorm/AssignMovingAvg$^hidden2/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden2/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden2/BatchNorm/batchnorm/addAddhidden2/BatchNorm/Identity_1!hidden2/BatchNorm/batchnorm/add/y*
T0
T
!hidden2/BatchNorm/batchnorm/RsqrtRsqrthidden2/BatchNorm/batchnorm/add*
T0
`
hidden2/BatchNorm/batchnorm/mulMulhidden2/Relu!hidden2/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden2/BatchNorm/batchnorm/mul_1Mulhidden2/BatchNorm/Identity!hidden2/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden2/BatchNorm/batchnorm/subSubBatchNorm_2/beta/read!hidden2/BatchNorm/batchnorm/mul_1*
T0
s
!hidden2/BatchNorm/batchnorm/add_1Addhidden2/BatchNorm/batchnorm/mulhidden2/BatchNorm/batchnorm/sub*
T0
�N
hidden3/weightsConst*
dtype0*�N
value�NB�N22"�N�nB��nB��m��>nB�Bn��n�7�m�ooBTinBj1n¢Lo!oB?n��nB�n��n�in�snB�oB�.n¥zn���m�ҮnB�Ln�9oB�{n���n�f�n�b�n�-�nB�nBxoBldnBp(nB��nB�Rn��dn�nB{gn���n¶�n�4�nB��nBGpnin�^�n�^dnBڡnB0�n�a�n��6nBpnB�Jn��~nB�cn��kn���nBSo��(nB��n��n©n�8�n]n��dn�ܗn��n�soBBnB�Ynº�nBuoBHnB�rnBQoB?n��n¶�n¾�n�Jn��rn 2oB��mB��mB�-nB�n�EUo���n�4�no�nB�m�F#n��~n�B�nB>�n�VWnB"�n���nB�knB��n´(o`nBdDnªnB%oBY`nB��nµ�nBY�nB�"nB��nBf�n��n¶�nBV�nBڴnB�mn�n°fn�nB� oB�o�nB�sn.n�b�nBHnB�nBB�nBF�n��mB�4n�%Fo¹0nB��n¬�n¶�nB)�nB�wnB�nB�8n�n��8nB��nB��nB�n`n�nB��nB�ZnB:;nB�So���nB�n�	;n·ZnBL{n��n�oB��n�nB�nB�dnBJ�n�]�n��n�4n��nB	�nB
�mB��n�"	oB^o¯lngn�n�n�\�n��nB��nB\�nB��nB�n�^!nB��m�r�n�-4n�b�n�Ron�s\n�<�n�n �m«�nB"un�Zn²�nBu�n�P�n�h�nB�Qn��nB�vnB��n��An�nBJ�nB�Jn��n�nnB��n��Bn��n¤inB�LnB�nBcn¸�n��rn�_:nB0So�R�n��mnBj�n�(�n,oB�UnBD�n�r�n�r;o���nB�!nB�1n¨Wo�F�nB��mB�nBgn²�n|nB��n��2oB �m�w�mB�nB0nn�Ȃn� 9n��En�"oB�nB�1n�[�nB4�m�I)n¡�n��nB�onBLo�n�nBX�m�^nB(,n�E�nB�pnsn�/oB��nB�Jo�[?nB^jnªo�nB��n�y�nB�un��|nB�in©�n�$XnB�nB��nBU�n�n��n�ncn9oB��n���mB�=oB�
nB�Qo�`nB}o�xnB�7nB��nB�n�n�6o�݇n�X�nB�nB,rn¨FnB��nB�m���nB�n� nB�xnB�nB��nBӌnB�n�ˣn��'o�Fn��nB.�n¬�n�N�n���nB��mB��nB�^nB�o�j�n�*�n�%�nB�n��oB��mB��nBhn��nB,�nB:=n�0nB_�nB=�nB�in��@nBH�nª�nB��n�n�%�nB Jn�ȐnB�AnBv'nB�jn¸-n�H�mB)oB�nB�lnB�nB�<o�nBK-oB��nB~�nBFwn�3�nB8�n�t�n�&�nB^9oB�TnB8�nB<�nB��nB��nB7fnB}o�KnHoB*[nB��nB\BnB�nB>nB@knB��nB�9nB�n�FoBصnB��no��*n�e"nB��nB��n�җn�nBn�nB8�n�N�nB�n��~n�r�nB� o o��nwn�+n�B�nB|�nBS�n��@n�`Ko�9[n� nBX�nB��n�x�n��pnB�5n��n�LVoB��m��n�E�n�n�ԨnB^Jn�?(n$oB��n�ۼnB��nBRo�[�n�z�n��n�r�nB�
o�R�nB@�n¾�n�(�nB��nªo�ƥnBt nB6xnB@�nB�XnB�n�n�	GoBg�nB��nBs�n���n�nB8�n�poBo�C)n��3o�nB^�nB�n¦�nBńn�nB��n�
�nB#$n�"�n��n�:dn��nBkwnB�nB �n��jnB�5nB9n�8nBs�n�anBBnnB��nB�?n���n?o�07n�nB&�n�Mn�i�nB@1o©En�*_nBWpn�*�n�12oB�onB��n�R�n�k�n�$rnBC�n���nBz�n�L�nBDRoBz�n�^n�\�n�&sn���nªin��Lo�p�nAo�>mnB�oB��n�f�n�;�n�pVn�4�n�C�nB�n�	o�K�nBF�nB�[o�L/o��#o�~�n��%oB�rnB\n¼�n°nBRn�x�n�n´�n�bEo�x�nBto�$@n¯�n�ŏnB��nBl�n��n���n�nB��n�inBj�n¬nBhnBw1o¯�n�~fn��n��@nB7n��?n�A<n�mKn�,�n�nB�o��n±�n��n��nBo�nBXao�noBc�n�kn¦<n�]�n¡�n��mnB�OoB�/o�	{n�M�nB�Ynµ�n¨�n�nB�4o���n!oB��mB��nB5on��oB	n�ɟnB��nB�ojn­rnB��nB?n�<�n¯nBePnBf6nB$Eo�n�roB��nB �n·�mB.nB��n�B�nBz�nB3So���nB?Go�Kan�NmnBږn��oB�nB�Qn�H�nB��nB�hn�[DnB�n�@�mB�9n��n�anBrn��-o�g�n���nBx�n�I5nB�*nBh�n���n��ToB$�m�1/n£�n»�n��n��nBRGnBC�n�x�n�CinBW�nB�nBp�nB��n��n��nBbin�doBȅnB�|n��n�\�n��rn���mBO�m� �nB��nB��n�nB��mB}�m��LoB�n�L�nB�oB��m�"o�r5n�خnpnB�n�0(oB+�n��~nBQ�n¿�n�F*o�^�nB<4n�o�U�nB�%oBp
o�OenB_�nB�yn­�nBV,n�HnB�mB9�noB�nB�nBLoB�n±cnB�KnB�*o­�n��nBцnB �nB��n�xSnB��nB�=o�N'oB�n�9.nª|nB,#nBnB/n��n��OnBoB�nB�MoBZ�n��nBgAnBf,n���nB�n¢�n�k o� �nB�Nn�ۣnªoB��nBvwn²�nB2en��Ln�tVnB\CnB�onB��nB�nn��)oB��n�
�n�*4nB��n��1oB �nB�9o�>nBPUoBP�nB��n�n���mB��nB<Tn���mBZ!nBxo��5oBn>oB�nB��n��n�bHoB�qn�e[nB4�nB)�n�:nB�nan�`n��n���mB*n�L�n�~nB��nB*�n���n��n�fynB�]n�j,nB��n��|nB
�nB�nB��m�7un���n���n�E�n��n��0n�x�n�,nB��nB]oB�Bo�h*n�n�d�n�nBϼn��+n���nBKEnB�	n®�n��n­�n�dvnBT�nB/nB�pn���nBB�n�j�n�8n�6�n�mBh0n��?nB�WnB��nB�n�];oB�n�n�QnB|o�nB��nB�hnB+�mB(�n¿nB�n���n¹�nB�NnBYYo�GoB��nB��nWn��n¦tnB+oB)nB�nB@'n��n���nBlnn��nB��nB�hnB�jnB�]oB�znB�nnB"�n��"nB�o�o�7�nB�nB�6n��'o)oB��m¤boB��nBt�m�n��\nB{n�Jo�Mn�<�n��n�K�nB�EnBh�n�ʻn�xnB�nB��nB�`nB��n�PnBfznBV�m��oB��nB��m«=n�n�
&oB��nB�zn�h�nBHEoB��n�`�nB�nB��n��enBoB�n�nB�tn�t3nB�9n�Jn·�nB�mn���nB&�mB3ZnB��n��nenB�|nBvOn�z�n¼dnB1nBH�nBZ�n�<�nB2>n�CoB��n��/o®n�nBC�mB{�n��Un�`�nB��nBdIo¥4oBr�n�n��nBq�nBϷnB�nB	�nB/n��nB9�nB�an�Κn���nB�mnBr�nB.�n�K-n�nBP�nB��nB�n���n�W�nBY8n�8�n«�nB�aoBX�n�`�nB�[o�>�n�p
n���nB��nB��n�fHn���nB}�nB��nB�8o£�n��m�v�nB��nB�n�7Cn�f�n�<�nB ao��hnB�n�i�nB��m?n�/�n�� o��OoB)�nB��nB�TnB��n�n��<n�4�n�U�nB�n!oB�"nB?�n¬;n�x�n�O>oB|nB��n��~nB��n�b!o1nB2�n��nB��mB�qn�|en��hnBNFn±�nBz$nBI�n�|�n�\KoBG�nB�#n�zn¦"o�3n�\�nB�n¼�n�!qnB�n�D�n��UoB(OnB��nB�m�o�n�oB1JnB��m��nBIanB�Bo�6 nB�ZnªnB�nB��n�b�nB�nB��nB�nB+�n�gNnB2n�m�n��mB|5nB��n��nB;<n�:�n�tWn��qnB�LnBdnbn��>nB�Gn�i�nBt�n�%Un�A n�FoBcnnB�8o�}rn�&an²dnB:�n�;�mBʖn�*o��rnª+n��nB�nB��nB��nB�]oBinBrn^o�fwnB'7n�n�n��
nB�snB\>n��n��an�ڻnB�lnB�in�e^nB)4n3nB��n�j�n���n�_nB�nnByln�L�n�a�nB�hn��mfn��knB�/oB�OnB�}n�$�n�Y=oB�\nB(nB�3n�X1ndnº�nB�WoB%7n�	7n��	n�z�n��"nB&fnB��n°Po�b�nBXJnBLDnB|�n��nB�oBb�n¼�nBb(nB�_nB �nBhZn�E�n�/�nBm�nBU�nB��n�n�j�nB�nBT�nª�n�D�nB�qnBZ�nB�Fn�nBMnB��nB\n�&�nn�Ґn�k�nB�}nB��n��#oB�0nBX-n�R[nB�n��n��}nB�TnBOnBAnB�Sn��nB�nBZ�nB��n¾nBR�nB��nB3oB�n�""nB��nB��nB	$oª�n°nBh�nBj^n�	�n�nB��mB��nB}nB�n��n�h�nB�Un��n�F:o�n��anª�n���nBK�nn��6nB�nBonB�4oB^�nB�oB��nB��nB�nB�oBr�n�nB��n�gnBChnB��n��KnB�)oBDEn��n�#tn¬TnB�oB�Dn�ernB��n?n�n��nBn¨`nB��n�L�nB��nB�oB��n¬!n��nB%oB�Fo�l?n¤*n�B�nB��nBv�n�A�nB&�mB+nB�n (n��5n�T�nB�nBĿnB?�n�ʫnB{�nB��m��GnB�XoB2n�jOnB0�mB'nBq�nB�n��|n�ʿnB,~n�>�n�n�Go©�nB�PnB�n�0�n�=�n�X�nBLxnB.�nnBN)oB~�nB� oBZhnB1+nBDoB�oB��n��n·�nB@�m��gn��n�O�n��n���nB��nB��n��n�*�nB�n¨nB8mnB�&n��n�MoB�n�X,oB��nB��m�#�n�R�n�x�n�|�nB��m�]�nB��nBo��nB�SoB��n�R�nBm�nB�{n�unBoBB�m���m�n´�nBT�n�nB@oB��n�agnB�n��n�{�n�NxnBήn��n�nBΩn�BoBx�nB�nGn�VtnBtjnB�n�m�!�m��n�nB��nBΉn��>nB(;n�7�n� �nB�1nB>nB8)o��o��nB~�mB|�m�A�nBH�nB��m��mBhTn��nB�-o¨�n¶�nB��nB\nB��nBf�n��AoBM�nB�Rn��nB4�noB�oB�-oBE�n�U�nB�o��6o� nB�n��nB�nB��nB�n�,Gn�JnBsnB��nB��nB*�mBb�nNnBA�nB��nB��n��n�h~nB�nB
oBr�mB۳nBN�n(nB��n�21o�oB~nB"�nB�n�%�nB�FnB��n­5n�1o§Sn�`�nB< o�~�n��fnB� oB,�n��oB�nBanB��n�0YoBt�n�n�ȖnBEzn¼ n�E�nB�wnB�n�Lo�/2nB�n���nBԮnBg�n�"�n��enB�wnB�8o�zSoBu
o�n}nB��mBhUnB8>nB`�n��n�ؓnB4�n¶~nB@dnBӄn�_�nB�]nBT�n��oBo�^oB��n�|n�b�nB�o mn�yrn�08nBn�]nBҒn�xnB��nB�(o��n�4�nB~�nB�WnB�oB�o�&�n�,anB�&oB�TnB��n�n�n�NoB��nB��n�_�nBƑn�ߑn�e�nBd5nB�oB�nB��n�	Dn��m�n�nBksn�n�K�nBynB�nB4�mB�n�^n�R�nB�nB��nBv�n�|�nB �nB4�n���nB�}nB��n�D[nB_Mn©ln�tnB�zn�<o�0n�:�n�j�nB�BnB��mB�o��o���n�ʹnB�nB�=n�H�nB_n¢5nB�!n�/HnB�No�u�n�B1n��1n��OnB�en�3VnB�nB��nBN�n¦�n´)n�IGn���n��_n�oJn�d>nB|rn�yon��!o�n�FenBb;o�bn��OnB"nB2�m�,oB�KnBa�nB8�n���mB/�n¾6nBw<oB*.n¹�nB�n��n�$5n�n�/BnBP�nBYnB4�n��nnBbZnB��nB<_nBλnB�,n�X0n�\DnB��nB��nB��nBl�m´=n�h�nB��mB#�n�z�n�<�n��/oB�oBD�nBzon��CnB�}nB��n�e�nB[2o�'oB7�nB'{n��Cn�q=nB�nB��m�~n��]oB�2n;oB�Fn�(�m��n�nB�nB�5o�B�n�
�nB��nB�\nB��n�Jn��nB��mB�znB��nB�anB��n�v�nB��n�m�P!oB �m��nB`nB��m��nB��nB�an� �nB��nB��n��nB�Gn��hn�n�O�n¢�nB/?n�ϧn�J[n¤�nB9�n�n²,nB�nBb�n�m�RonB;�nBj3nB�{n�g�nB�n��RnBr%o�uRn��n��nBn�nB�o¦Ko�b�m�s�mB�o�  oB̅n�;�n��o�h!oB�nB֭nB&nB�gnBloB�hnB�6o�*�n�ZMn��unB��nB�n�0SoB��nB��nB�Cn¦�n��nB�mnB��m¡�m�`�nB.En�6oB��nB�DnB$5n���mB�!o�f�n��nB=n¯unB4�nBX�nB��nB�Xn�n��n�/�nB��nBS�nBo���mBj�nB,n�0�n�S�n��4nB�_nB��nBT�nB0ynn��nBsn���n�HMnB1�n��nBA�nB�enB�nB��n���nB�n��n�nBx�nBާn�+�nB}�nB;\nB�oB�nB��m�OZn��nB��n��n±^nB�qn�V�nB%�nB9nB�nBm�m��Ro�^oB�Vn}n�oBfnn� oB�n��mB�,n´~nB��n�j�n��nB\an��nB�Cn���nB�	n�ʢn���mBÀn�Յn�A�n�r"nBwDnBT�n±0n�I�n�:YnnBs}n�d�n���nB�_nB�nB�$o��'nB��n�v�n��oB0o�S�nB"[nB:�m²�mB�m®�n��n�4�n�q�n��JnB�pnB�o�T�nB��nB��mB�nB~`nB��n�n�R�n�YgnB?|nB��n¨�nB|n�$�nB�n��}n���n��^n�4 n�d�n�(�nB�_o��nnB�bnB��n�n�nB{�n� oB�@oB7�n�oB	 o�״nB��n���nB5�nBu�n���nB'_nn�a�m��tnBUDnB�nB��n�hnB�Xn�XnBF�n>n��o�&�n�0�n�l�n�nB1nB��nB1�n�";n�rlnBʇn�nB��nB�Mn��nB�7nB��n¨&o��6own���nB��nB�o���n´%oB=o�p�n�no�F�nBےnB�]n�4�n�SqnB�In�@�n�Jn²�nBg�nB'�n�X1n»�nB�VnBzqnB
wnª�n��o�oB�nBR�n�29o��m��nB-o�B+nB:nB�n��#n�n�gnB�nB�oB(�nB��nB�nBxo��nB^EnB��nBӢn�n°oB^�nB3n�w*o�Mn�R�nBH�nB\n��jn¶�nB��n¸�nB�)nB�nBr�n�y/oB6�nBzn¨oB�o��oB4o���nBFvn�Ȧn��Gn�(�nB��n�6[o�*�nB^�n�fSoB��nB2nBjo 4n�Xpn���m�:�nB�nB̶nB�n���nB>bnB��n�9nB �nBh�nB�5n��rnB�inB�,n�Dn�~]n�Ro�B�nBU8n��ln��bn¡|n~no��n(n�Rn�, n�w�nB��nB+�n� anB��nB\�n���n�*�n���nB�n¥�nB_�n�.@oB�JnBn�nBv*n�H�n��&oB�oBE�nB��n®n���n�� n��nB��nB�/n�<�nB��n�}�n�&�mB	�nB�+nBk�nB��n��nB&oB�knB(nB4!n�nB�?oB��mvn��jn�ڐnB�n�31o��nB|nB��n�4�n���n�*.oB�o�4 n�Wyn�6�nB�nB�XnB^4n�p]n�CnB4�nB��nB�:n�<�nB�}n±�nBO�nB�gnB�nº{nº�n���m�AqnB�_o¨dn�4�nB�Vn�zwn�R�n��OnB�WnB� n�Xn�:$oBCRoB��nBY�n�8�n·�nB dnB_UnB��nB4n®�nB(�n�x7o8nB��nBz�n�&�n�Okn���m�[�nB�nB�|n�nn��n�XCnB_oB�&oB �n�M}nB;�nBn�*�nBV�nB�m���n�Tn�o�E�nBHAn��>nB�2nBjcn�n��Qn�n��n­�nB�
n�(`nBc�n��mB��n£4o��JnB�gn�ªnB/(nB�n�c7o�H�nB��n²�n�nBL�nB�Tn�1�n¸�n�bnnB��n�>�nB�>n�ڈnBR�nB�BoB��n¼�n���nBȲn�Vlnªo�&unBodnBŞnBm�nB�o�`�nBE nB`8n��>oB�n�[<o���mBZ�nB�n��7nBznB��n©QnB�gnB��nBen´�nB��n�pon��nB�un�b0n�&�n��nB½n���nB�nB ,n�(oBϨnBs�nºQnBj�mB�rn�}�n�F�nBoB�un��Dn«�n��]n�n��!o��n�E�n��=n�>�nB�oB�~n��nB&7n��^n��XnB�nB^wn�nB�WnB�~nBL-nB�&oB��nB��n���nB��nB^�nB%o�oXnB2�n�,�nBR5n�H�n�&n�:o]nB��n�Ven���nBnB2n�P�nB'n�
�nB-�n��Fn�8�n��}nB�nB8n�H�nB~�n�=�n+nB knenª�nBOn�_�n��<nB��n�n~nBvn¼oBtnBH^n�5�nBHKn���n�;�nB��n��4n&oB�4o�h�nB n���n�J	oB~�n���n�n�w�n�8VnB\6nB� n��<nB^On���n�
vn�`nB��nB��n���n�nB,�n¼"nB�oµ�n�QCn³�nB&�nB�,n��nB�/nB oB�qn�B�nBr�n¡Un¶�nB��nB�n��YnB�pnB+EoBdoBtoB��n�t
n��n�\�n�p�nBI�n���m�(�n��nB�HnB�rn�.rnB�XnBj'nB��m��n�n�֤nB�n���nBʰnB��m���mBn�mB�nBN#oBInB��n�Lo�nB<=nBtLn�[�n� o�o�m�}n¥oB��n���n�z�n�5�nB��nB��nBPnB�n�Pn�o�nB�Rn An�w�nB��nB�nB��mB�7n�nnB\En��7oBe�nB�nBD�n�xnB�tn�6ZnB��n���n�
^
hidden3/weights/readIdentityhidden3/weights*"
_class
loc:@hidden3/weights*
T0
�
hidden3/biasesConst*
dtype0*�
value�B�2"��n�|�nB{�n�|�n�z�nB}�nBm�n�|�nBx�nBz�nB{�nB~�nB{�nB~�n�|�nB|�nBv�n�x�nB|�nB{�nB~�n�|�nB~�n�|�nB|�nB~�n�|�nB}�n��nB|�n�~�n�|�n�z�n�|�n�|�n�}�n�{�n�|�n�}�n�v�n�~�n�z�n�|�nB{�n�y�nB~�nB�n�|�nBz�nBo�nB
[
hidden3/biases/readIdentityhidden3/biases*!
_class
loc:@hidden3/biases*
T0
�
hidden3/MatMulMatMul!hidden2/BatchNorm/batchnorm/add_1hidden3/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden3/addAddhidden3/MatMulhidden3/biases/read*
T0
*
hidden3/ReluReluhidden3/add*
T0
�
BatchNorm_3/betaConst*
dtype0*�
value�B�2"�w�nBx�n�{�n�{�nB|�n�~�n��n�v�nB{�n�y�n�|�nBw�nB~�n�|�n�|�nB|�nB|�nBA�nB|�n�f�n�~�n�w�nBo�nB~�n�|�n�z�nB|�n�~�nB|�n�y�n��n�t�n�}�nB~�n��nB{�nB~�nB{�nBz�n�|�nB{�nBz�nBz�nB~�n�|�nB�nBx�n�|�n�{�nB|�nB
a
BatchNorm_3/beta/readIdentityBatchNorm_3/beta*#
_class
loc:@BatchNorm_3/beta*
T0
�
BatchNorm_3/moving_meanConst*
dtype0*�
value�B�2"���05��5�55ƹT5,5K5�O�E�D�F{T�5�uICp��4�!]F�
C�,:5��4�
\F���E`�~52��4�f!5G�59wG/�5Mz#5���F�Z5��b5|�5+��5R��5H9[F�%5���F/�$GL�,5�/�E��5���57��ES�5{ce5��$G�| 5��(5֮R5�|\Fx�F��5�$�4� 'C��5
v
BatchNorm_3/moving_mean/readIdentityBatchNorm_3/moving_mean**
_class 
loc:@BatchNorm_3/moving_mean*
T0
�
BatchNorm_3/moving_varianceConst*
dtype0*�
value�B�2"�F5�7��7��7Ǻ�7���7.�G�9XHoz�7��Gtl�7�)G2��F�b�7���7OG9G�Gu	�7$��79��7��7M�HQX�7�}�7]H;'�7���7�8�7{�7^[�7��G11�7	��G���G���7De�G�$�7���7uA�Gb��7���7���G�H�7���7���7�4�G��FfR�7�J�7��G+��7
�
 BatchNorm_3/moving_variance/readIdentityBatchNorm_3/moving_variance*.
_class$
" loc:@BatchNorm_3/moving_variance*
T0
^
0hidden3/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden3/BatchNorm/moments/MeanMeanhidden3/Relu0hidden3/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden3/BatchNorm/moments/StopGradientStopGradienthidden3/BatchNorm/moments/Mean*
T0
e
5hidden3/BatchNorm/moments/sufficient_statistics/ShapeShapehidden3/Relu*
out_type0*
T0
�
4hidden3/BatchNorm/moments/sufficient_statistics/CastCast5hidden3/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden3/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden3/BatchNorm/moments/sufficient_statistics/GatherGather4hidden3/BatchNorm/moments/sufficient_statistics/Cast>hidden3/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden3/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden3/BatchNorm/moments/sufficient_statistics/countProd6hidden3/BatchNorm/moments/sufficient_statistics/Gather5hidden3/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden3/BatchNorm/moments/sufficient_statistics/SubSubhidden3/Relu&hidden3/BatchNorm/moments/StopGradient*
T0
�
Ahidden3/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden3/Relu&hidden3/BatchNorm/moments/StopGradient*
T0
w
Ihidden3/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden3/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden3/BatchNorm/moments/sufficient_statistics/SubIhidden3/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden3/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden3/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden3/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden3/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden3/BatchNorm/moments/ShapeConst*
dtype0*
valueB:2
�
!hidden3/BatchNorm/moments/ReshapeReshape&hidden3/BatchNorm/moments/StopGradienthidden3/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden3/BatchNorm/moments/normalize/divisor
Reciprocal5hidden3/BatchNorm/moments/sufficient_statistics/count8^hidden3/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden3/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden3/BatchNorm/moments/normalize/shifted_meanMul7hidden3/BatchNorm/moments/sufficient_statistics/mean_ss+hidden3/BatchNorm/moments/normalize/divisor*
T0
�
(hidden3/BatchNorm/moments/normalize/meanAdd0hidden3/BatchNorm/moments/normalize/shifted_mean!hidden3/BatchNorm/moments/Reshape*
T0
�
'hidden3/BatchNorm/moments/normalize/MulMul6hidden3/BatchNorm/moments/sufficient_statistics/var_ss+hidden3/BatchNorm/moments/normalize/divisor*
T0
o
*hidden3/BatchNorm/moments/normalize/SquareSquare0hidden3/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden3/BatchNorm/moments/normalize/varianceSub'hidden3/BatchNorm/moments/normalize/Mul*hidden3/BatchNorm/moments/normalize/Square*
T0
�
'hidden3/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_3/moving_mean*
valueB
 *���=
�
%hidden3/BatchNorm/AssignMovingAvg/subSubBatchNorm_3/moving_mean/read(hidden3/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_3/moving_mean*
T0
�
%hidden3/BatchNorm/AssignMovingAvg/mulMul%hidden3/BatchNorm/AssignMovingAvg/sub'hidden3/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_3/moving_mean*
T0
�
!hidden3/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_3/moving_mean%hidden3/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_3/moving_mean*
use_locking( *
T0
�
)hidden3/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_3/moving_variance*
valueB
 *���=
�
'hidden3/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_3/moving_variance/read,hidden3/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_3/moving_variance*
T0
�
'hidden3/BatchNorm/AssignMovingAvg_1/mulMul'hidden3/BatchNorm/AssignMovingAvg_1/sub)hidden3/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_3/moving_variance*
T0
�
#hidden3/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_3/moving_variance'hidden3/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_3/moving_variance*
use_locking( *
T0
�
hidden3/BatchNorm/IdentityIdentity(hidden3/BatchNorm/moments/normalize/mean"^hidden3/BatchNorm/AssignMovingAvg$^hidden3/BatchNorm/AssignMovingAvg_1*
T0
�
hidden3/BatchNorm/Identity_1Identity,hidden3/BatchNorm/moments/normalize/variance"^hidden3/BatchNorm/AssignMovingAvg$^hidden3/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden3/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden3/BatchNorm/batchnorm/addAddhidden3/BatchNorm/Identity_1!hidden3/BatchNorm/batchnorm/add/y*
T0
T
!hidden3/BatchNorm/batchnorm/RsqrtRsqrthidden3/BatchNorm/batchnorm/add*
T0
`
hidden3/BatchNorm/batchnorm/mulMulhidden3/Relu!hidden3/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden3/BatchNorm/batchnorm/mul_1Mulhidden3/BatchNorm/Identity!hidden3/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden3/BatchNorm/batchnorm/subSubBatchNorm_3/beta/read!hidden3/BatchNorm/batchnorm/mul_1*
T0
s
!hidden3/BatchNorm/batchnorm/add_1Addhidden3/BatchNorm/batchnorm/mulhidden3/BatchNorm/batchnorm/sub*
T0
�N
hidden4/weightsConst*
dtype0*�N
value�NB�N22"�N��nB��mB(�nBI�n�V�n��on��WnBj�nB=nB75nB.�nBPOnB��n�n�Byn�xnB�o¤�n�"n�nBp�mB?bnBb�m�sGn½�nBR�n­o¼Qn���nB�VnBf nB��n�mB�nn�GsnBX#nB�n�e0nB$�n�\GnB��n�"�nB~�n��nBon�[oB�nB�8oB�Kn�nB��n®�nB�nBSPnB��nB�.nB��nB�DooB�n���mB�Pn�,�n��oB�@nB�CnB�knB}�nB0�n�5�m�Ηn¸�n�0�nB'3oBt�n��nB�oB�Zn·�n��|n�N'n��=oB,xnB�wnB�Cn��nB��nB�cn�nB&�n�mn�y�n��n��n��|n���m�S�n�$�nB,�nBD�n�An�l<n��GnXnB��nB�#nB�vnB*nB�n�&Vn�AMnB*�n¸XnBdVoB?xnB�n��o���mB�-nB0n�a�n�R%n�"�n�lqnB��m��nB3nB�^n�3oB�-o(n���nBޢn��nB��n�'�nB�n�co�?PnB�o�!xnBDoB:nBB�n�d�nBތn��oº�n�3oB�n
nB�XnB�PnBUn�KznB"n�QnBv�nB�oBi�nB@Bn�5nonB��n�hn�?nB"]nB oB�o��cn±�nB��nB*!n�q�nBI(nBv2o���nB�Bo¶ao�6�mnB�_n��nBn�n�nB={nBV1oB\�nB��n��YoB %n�WQoB��noBI�nBd�n�n�*�mBho���n��]n�M�n��m�_<nB�5nB�nBz�n�-n�%Xn�T�n¨�nB�Bn��Wn���nBc o��n�nB�bnB��n�O�n£�nB��nµ�nB+�nB"�n��nB�NnB2�nB�nB�#n�{in�<�nB�Un�2OnB�ln�,�nB%[n��n²HoB�o��oB��n�n�S�n�O-n��n�n8o��nB��n�XIn�ĸn�nKn��mB1�n��BoB�bnB�PoB)�n�n�nB;?n��;o�p�nBX�nB��n���n��o��Hn�>KoBօn�j�n�&�m���n��o�^�nBRo�~�n�_�nB��nB��n�so��onB�4n°on��ln�Y;o���nB��m�oB�$o knBT�nBJon�m�Nbn�oB
�nB�In��oBZn©�nB/�n£~nB�rn�^mn�-�nB�6nqnB��n¼�nwnB�nB��nBpyn¤onB��n�nB|�nBIn�L�nB�BnB�4odn�B�nB�oBK�nB\oVnB_�nBh*nB��n¸cn���mBO�nB�)n£NnBx�n�8No�:�n�I�n��n��Tn�o�nB�9oB�oB�n�z1n�Y�nBV�nBtnB
o�"�n²	o��o���nB͈nBS�m�n�x�n�Ǜn�tn�#�nBd�nBBtn�OnB��nB]�mBo��n¬�n�nB*�n��Xn��nBAnB�n�ɑn¢YnB��m��nB�7n���n��nBՊnB��n	oB�sn�b�n��JoBK�n��non�	)o���nB�nB��n�lao��n�6Cn���nBjn�o�n£�n�%oB��nB�\n��nB��n���n�N�nnB��n� 3n�$�nB:pn��n¥[nBz^nB��m��JnB�n¸�m�j�nBi"o�4nn�"�n�a�nB��nB�nB#�n��`n��tnBڸnB(oB�tnB'�n���mnBb�nB\�n�
cn¼ynBd�mB?.nBɧn��n�0�nBqnB2�n�knBo��n��nBSo�'o�3n��o�h#n�n��<nB�=oB�oB �n�InBoB�nB��m�{{n�D�n�=�nB7o�қnB<fnBl�nB��n�O�n�"�nB�{n��bnB��m��nhnB�nB��n¸enB�hn°�nB��mB]�n��n�vo±=o�kn�%.o�n�|Bo�_oB�AnB�o�4nB@nnBWpn´�nB$#n�T#oB!�nB��n�5oBֳnB�enB�nB�nB��nwn�U�n��an�/o�D�n��nB�En�ʭnB#�nB�o��}n��zn�_�nBL�nBF�n¬OnB�(oB|SnB�6o±�nB�[o�3�n��)oB�n�Nn�Ĺn�Z�mB��n�FAn�UKn��^nlnB&�nB;enB�mBon�pUnB�SoB��n��#o¦>n1n� �n�C�n�!sn�g^oBRRnB�n�W�n�k�nBńnB�|nB�\nB�In�A�n���mB�aoB�_n��vn�
�nBS�mB�;n��n¤�nB)jnB�nB��nBX.o���nB�[nB�oBf�nBZ3o�߲n¾n��sn��0o��SnB$�m<o�$Ao¢Yn�w�n¾tnB�nB��nB�4n�Z�nB`9n���n�`�nBwnB��n�z3n¾�n�jnB-�n�/$n´�m��^nB,;nB=�n9oB04nBp�nB�/n�.�nB o�մn�nB;�n���n¹�n���nB�mnBVBnBV�n�r�n��nB�on)nB| nBYo���n��oB�n�Ytn���nB3o�L@n�SnB<�n�?'o�M�nB-<n���nBC�n��n��nBT�n£�nB�nBo�Fn��n��Xo��On�!�nB<=n�]�nB��nB:un� oB�7nBS�nB��n�ٕn�.�nB��n�nB��nB�$n�ZXn�dnB�?nB�/nBjpn�f�mB	dnB��n�%�nB^�nBOnB�4n���nBR6n�f!oB7�nBjnB��nBC�nB^2n�A?o���n°�n�n¸/nB*�m �nBtn�8oBB�nBnB �nB�HnBy�nB�oBq)o��n²�n���n�n��n�\�nB̔n �nBϚn�ooB�KoB�n�n¹�nB��nBH@n�_�n�n�?+oBg�nBo�n��n��n�nB�=nB�0o¤nB+An���n�wxnB��mB�xn�`'nBʒnBd�nBĞnBEJn�S�n�@�m�Ho���mB��n�nB��nB�OnB:%oB`�n¨o�8�n­�nBHn�k�n�X�n�61nB�]nB;�nB��mo�$�nB�n��n�jnBޒnBz�nB>�nBi�n���nB	n>nBc�nB�snB��nB&�n��bn¬�n��nB��nB+nB�(nB��nB�nB�LoB�an�5�mB�pn��Jn�#�nB��nB��nB��nBR�nBSo���nB��n� �mBԯn¦�n�nB)n��n®Cn��jnBDn�F\o�|ynB�yn��oB�nB�n£�n�\�n��Bn�n�08n�r9o�ҳnB�oB�oB��m��nB�o�uo��nBlyn,o�);n���n�\$o�ށn�nBt�m�menBݲn�L�nBpKnB�n��UnB\�n�n�[_nB�o��;oB(�nB��n��nB�enBbo�y�n�p�nB�+nB�m«oB�nB{�nB��n���mB��n�nBjn��o�[nB 4oBe#nB��nB�m��SnB��n��&oBb�n�w�n�H�n��~n�\?oB�sn°n��Kn�$wnB�nB"pnB$�nB��m�In��nB~�nB�HoB�LnB�7n�p�n�kn��nB
�nB��nB2oB*�nB&dnB�{n�Ln���n�4enB�oBo�m�d�n�.yn�;<nB�jnBm�nB�In°=nB�dn�T�n���n�}�n�W�nB��nB�"n°>nBB-nBGnB8�n�'<n��nB�+n���mBJ�n�:}n��enB��nBzHn¢[nBUoB�nnB%�nB��nB0	oB�hnB4�n��2o¼^n�>�n�=>oB�enBcEnB�mnB[�n���nB4^nB�On�M�n��nB��mBo��KnB��n«�nB+�nB��n�ɕn�I(nB��n�.n¤@n�n�nB�nB��n�;�nBs;n|nB�9n�E�mB(n��Ho�VQoBǫnoB׽nB9 oB�\nB��nBr�nB5n�OOnBxpnB�Rn�Ρn��enB\�n��n��nB��n�Y�n�޼nB�	o��"o���n��!nB&o�$znB��n�2n¡nB�<nB�on©�nB&Gn��>nB��nBvo�jnBοnB�[nB�n�j�nnBgKnB��n�Βn�Eo�nB�BnB�n�3�nB��n�@�n�F<n��oB��nªNn�j�nBQ�nB
in�n��>n��o�0�n�f�n�}"nBF]n�ɧnB( o�o�jnB0�nOnB�on�=�n�nB�OnB�wn�\�n�F�nB�$n�m�n��nBN3o���nB��nB�n�z&o�2�n�(�n�cFnB�Rn��nB�WnB��nB��n¼Io���nB��n�nznB�n�n�֊n���nB�n�@�n�]
oB�nB�mB�o�n���nBp$o�$�nB��n��n�1�n �n��+n��nB�>oB�mn�B�mB:�n��ln�/gn��nBz�nB�oBio���nB޶nB��nB��n��n���nB8�n��mB��nB��nB�nB�~nBx,oBD�nB�n�&RnB(2nB��nB��mB�n��*o²�n�H%nBPRn��nBRnB�nB�CoBZ�nB�n��SnB;>o�ELoB&�nBn�m��mB01nxn��wnBl�mB�^o�ׇn­�n�-�nB�Xo�s�m�o��n�(snB&oB�n�An4nB�o�nB�o��n�'(nB�n��|n��tn�m�nBun�nB�n��n�̺nB�QnB�nB��nB o���n/oB�nB�n��nBXnB�bnB{}nB��n´�m¡�nB!�nB��n°�nB��n��nB�IoBo�Z�nB��nB@�nB��nB�~n��+nB�&nBrgnB:�n���n��2nrn�.tnBfn��mB9<n���mB`wnB��n��bn��nBO<nB�nB�n�AtnB
Go�H4nB��n���n��,o� �n�-(nB;1nµ�n� nB�snBmo��4oB��nB��n�CoB	�nB�n�>�n�&n�nnB4o�qun¸UnBn�\�nº9o�*�n�l[nB�gnB��m���m��n��nB�UnB��n�LEn�~�nBT�n�cnB�Yn¹inBinB�vnnB�n���n�h�n�an¿�nB��n�T�nBMnBv�n�H�nBS%o�L�nB:6nB��nBJPn�;�nB��n� �n� �nB��nB�On�ZoB�dnBun�&�n�Sgn�tKo�yqnB�oBfnB$oBDo¸rnB��nB*_o�O�n�nB�n��nUnB.nn��(oB�oB�bn�t*o�y�nB��n�T.n�>�n¡'n0oB��nB\So�f�nBU�n�$�nBHn�ȆnB�n��n��nB�XnB{�mBS�nBcoB&�nB��mBhnBxnB�n­RnB��n��n�nB��nBЧn�-:oB]^n¹n�;wnB{(n��DnBv�n���n�d7n�nB�@nB!�n��qnB�2o°�nB�,nB��n���nB\�nB�n���n«MoB�nB��n�P[n�c�nB!�nB�UnB�[n�!Wn�+�nB��nBjxn�%�nB�~n�tn�k.n°�n�XZn��Pn�nB>�nB�wnB]>n��bn���n�|?on��FoB�'nB)�n�
�n��_n��VnB�>n�8�nBc�m�nB��n��kno�N�nB�nB��nBCnB�oB*�n��dnB5�nB�Fo�z�n�&�nB�"oB\�m�`�n��Qn ?oB<KoB� oB��n�ZoB&�n���n�W�nBԉn�Tn�]�n�5�n�:fn�zOo�'nBd�n·onB;@n�n2nBS~nB<�nB�o¢�nynBM�mB}unBX�nB�nB&�n�p�nB��n�Zn�V�nBG�nB�)n�X�n��}nBRoB�`nB��nBNdn£n�Z�nB�n��o�0o�k3nB��nB�!nB�yn�DnBNxn���nB�n��n�nB�%njnB�UnB�{nBsnB��mBXnB��nB�OnB�On¡n¢unB,UnBT�nB�sn�n�oB͛n��oo�,�nB�bnB��n�I�nB��n³�n� �nB`�nB�-nInB enBznBz�nB��nB3�n�nB�2nB��n�;4nB^�nB�dn��n�nB��n�4�nB��n��nB�nB	�nB�!nB��m�n�hn�nB�mn�̔nB�OnB�oBZ�nB��nBUn�ZnB��n���mBhEo�5nB;�nBenBfEn��n�Ȟn�00n�G�nB��n»bnB��nB>nBE=nB͜n�T,nBD�nB6�mB�8oB�sn�J�n½&oB�gn�0�mBY�nBwnB�oB��n���nBqnB��nB�Nn�n��nBs�nB�Un���nBPn��+n�n�*sn�nBncnB)2nBf9nB��mB�kn��o��n��xnB�"n�e�nB��n�nB*WnBІn�&o���m�GnB�wn�o�n�vnB-znB/0nB�o�nbnBbRn�o´�mn�wAoBY�nB.n���mBˎn�ܬn�nB�ln���nB��n�_�n�E	oB�n���nB��nB{o��nBvn�7�nB>�nB�&nB�fn�?�n�3n�n��nbnB%�n¤On�8?n��n��+oBe�n�nB(AnB��n�	�nBo�?�nB7o��yn¨dnB^en�[�nB�-n«�nB�n�҉nrn�n���mB9n�ZnB%/nB,n��Wn°hnBwn��)nYnB��nB�EoB^<n�#�nªTn¨1o�	DoB��nBO�nªJnyn��mBP�n�nBٛn�rn�X�nBz�n�$Do�ɏn�K�n���nB��nB&qnnnBrbnB�-n«�n�R�nB@�n�ºn��nB�o�ԓn�in���nB�n¾o�<in��"n�JoBWnB�yn���nB��nB��n�{�nB�o�D[n�6�mBx�n´�nB��n¾gnB��nB�Kn�,JnBW�n�R�nB:�nB|jnB�n�44o n�V�nynB��nBvTnGnBaCoBT�n�$n�<4n�{)o���nB\�n�d�nB�nB�/n�%nB��mBV�n�ūnB��nBy�nB�]n²wnB�nB�JnB�Nn���nB+�n¾EoB�o�"n¦oB�n�4�nB�nB�n�0�nB�n�~@oB�\n¦+oB(bo��n�SoB�vn��n�s�nB��nB��nB��nBTZnB*En�(�n���nB$�n�#�nBRbn�jLn�nBu�n���n�fTnBnBl�n�<�n�hkn�%nB%EnB^un��?n�n�\9oB�#oB��nSnB�oBZpn�R�mB�kn��mnonB
�n�Sgn�1o�nB�n��nB0�n�rCnnB�jnB3�nB�nBL-o�n��oB�nB�n�]�nB6�nBB�n�4:oB�o�&ln���nB��n��nBǢn��onBk�nB��n�k�n��nB�_n�$�m°�n�t�nB��n`nB\rnBS�nB�nB�nB��nB�oB��m�nB@�nB5[n¶�n�z�nB��nBbrnen�+�nB�{nBsAnB�-n�� n�R�nB�MnB8DnBH@nBH�m�e�n�p�n��o���n�L�nB"�n�wnBoB�Jn�P�m�Jin�P�nª�nB�SoB�FnB�pnB�n�o�*�nB�}n�r�nB�rn	n�mB�in�7n��	nB�nnB�To�@n�%'nB�Eo�wanB8�nB�o�Zdn�n�K�m¾�n�n��m���nB�_nB�oB��n��nB��n�=�n�*oB�n�n�@�n�oB��n�MKn��nB,�nBs�nB׾n��n�}�n��Pn�۠n���nB=SnB��nB
�nB&�nB�en]n�78n�n�_nBN�mB1�n�n�inB��nB�o�Ean?n�n�zQoB�nB��m�L�nB3�nB�Cn�nB��n�|�n�y�nB�1o�1oBQnEnB~o�cnBv�nB7�n�ZnB�n�1�n���n�nB��n�z�n�&�n�|�nBb�n§�n�__n��oB��n«&nB��n�,�n��nB��nB��n�doB$oLn���n��n�v7o�x�nB'�mB<�n��zn�DoB�oB��n�lnB~�m���m�WoBc�n�Oo��n¨�nB�nBX�nBžn��noB>OnB�;nBB�nB�m�UZn¸fnB�m�f�n�dJn�rnB��nB�/oBԒn���n�2�m�n�Ko�/�nB�n��-nB�;n���n��0oBh�n�oB!�n�)�n��
nBv�nB�n��%n���nB�9n��n��_oBShn��MnBCknB�n�[1no� 6nwnB�n�%�nB	�nB]
nB(DnB<n���mBzQn�t�n�v;nB�Jo¦No���n���mBD
n�Ro�¬nBj�nBk�n�f�n�i�n �nB�nBo�n�j%n�m�n��nB*n��kn��bnB�bnBe�mBl�nBcnB;�n�nTnBN�nB�n�Z�n�)�nB�nB�oB0gn�Qn���n�|�nB�Dn�-6n¹wnB6�mBnBznBZ;n�`oB�n��QnB7n¦Go��?n���n��NnBfWn�v�n¾�mB��nB7oBoB��nB7�n�0�n��nBl�n�<o�B�n���nB�oBJWoB��n�Gn�ئnBҋn��-oBB�n��3n¬oB�nB��n�3o�4�nB�Ao¦�nB�oB`�m��^nBYoB �n�m�? n� xn� �mB��n�nNnB��nB�RnB�n�opnB�n�!zn�(�nB>On��n6n�~3n�n�n�RInB��nBuKnBzzn�4�n�~�ngnBJ<nB�]n�x�n�-�n�,1o���nB�nB;�n�e�n²En��*n�,6o�D�nB��nBYVn�VSnB��nB.Ao!n�v�nBf�n��nB��n�
^n�}nB�_nB4�n�kn�J�nB��n�2bnB��n��%o��nB~1nB
�mynB�:o��n��oB��nB��n�FqnBn2nB�AnB��nB��n��Ro¬&nB^�n�
SoB��n�N8n·+nB��n�tnBCNnB��nB
�mB��nB֘nB��n��nB��n�<ao�,�n�B�nB�jnBxnB��n��n�V{n���nBŀn�S�n��nXnB%_nB�unB|�n��'nB�"o¢tnB�!o�x�n�z�nB(�n�FEnB��n���nBo�nB(Wn�%<nBoB�nB��n¶�n oBnNnB� oB�jn���n��Sn�`\nB�6o®�n�nB�UnBr�nB��mB`o���n�6�nB�nB�o�#|nGoB�nB\�nB��nB��n��nB��nB�5o¯�n�(2oB��nB
�nB4nBh�nB��nB��n¨`nB��nB<zn�{�nBL�m���m®�n� oB��n�nB�XnB�anBmvnB/�m�n�'�nB�\n�\oBV�nMn�ԍn�n�mB<�mB�bn���n��n��n°�n��)nB|IoB�nBfDn>oB�3oB�^n�jfn<n���n�z!nBn¹znB�nB��n�&�nBZ8o�.�nBj'n�{�n}n�n¢�nB4�nBfn�V�nB<o��
oB��mB�nBD�n�i�n��{n¬yn�_�nB�AoB�Ho�n�
�n��n�֪n�`�mB�unB0Gn�qn�Wn��n¶~nB[�n�P`oB��nB�onBX�n�o��!oB��nB��n�,�nBʙn��[o��InB�sn¦�nB
�nB��nB9nBY�n¥o�� nB�nynB/o��,oBf�n�n£FnB�Zn�o�nB�*n²OoB��n�<�mB��nBk5n±�nB�XnB@9n�|dn �n�d�n���nB�oB��n���n�,�n�"�nB�o��RoB5o��fnB�GnBn«�n�̍nB³nB�$n���n��TnB�Fn��oB��mBZnµ�nB��nBy�m�T'o��n���n��nB(�n��1nB
<n�NenB��n�z n�nB�qn���n�z�n¬�nB�|nyn�C�nB�n´<o�S�nB�En�
^
hidden4/weights/readIdentityhidden4/weights*"
_class
loc:@hidden4/weights*
T0
�
hidden4/biasesConst*
dtype0*�
value�B�2"�~�n�m�nB|�nBx�n�z�nBC�n�z�nB|�nB|�n��nB~�nB|�nB}�nBl�n�x�n�z�nB|�nBz�nBw�n�|�n�z�n�f�nB|�nB{�n�~�nBz�nB|�n�q�nB}�n�|�nBz�n�{�n�|�n�~�nBw�nBw�n�|�n�|�nB}�n�y�nBy�n�z�nBg�n�|�nB}�nBu�nBz�n�z�nB~�n�{�nB
[
hidden4/biases/readIdentityhidden4/biases*!
_class
loc:@hidden4/biases*
T0
�
hidden4/MatMulMatMul!hidden3/BatchNorm/batchnorm/add_1hidden4/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden4/addAddhidden4/MatMulhidden4/biases/read*
T0
*
hidden4/ReluReluhidden4/add*
T0
�
BatchNorm_4/betaConst*
dtype0*�
value�B�2"�|�nB{�nBw�n�z�n�s�n�y�n�v�nBz�n�m�n�z�nBv�n�w�n�y�n�z�nBx�nBf�n�{�n�{�n�z�n�v�nB|�n�u�n�z�n�x�n�|�nB~�n�z�n�q�n�t�nB~�n�z�nBz�n�y�n�y�n�t�nBx�n�|�nB|�n�o�n�|�nBy�nBx�n�y�n�|�nBz�n�y�nBa�n�{�n�l�nB|�nB
a
BatchNorm_4/beta/readIdentityBatchNorm_4/beta*#
_class
loc:@BatchNorm_4/beta*
T0
�
BatchNorm_4/moving_meanConst*
dtype0*�
value�B�2"� ��E�s?54�-C��m5���E�gE5�{�5 .=5b��E�+]F^�Y5���E�	G���B��N5$�5F#C��DCޥ5�q�55��B:�5Ǜ�F ̈́B~yC�C'5��a5uH�E��YF ��E�JZF�Y*5,HJ5�E#;�Es[F���F�O�E���4J�3C_�-5 �5�>�E��5��\F+Ɛ5��p5��5)(5��0C
v
BatchNorm_4/moving_mean/readIdentityBatchNorm_4/moving_mean**
_class 
loc:@BatchNorm_4/moving_mean*
T0
�
BatchNorm_4/moving_varianceConst*
dtype0*�
value�B�2"��&�F$�7=?G��7'CG*�7���7���7ԳMHP]�G^3�7yF�G6�F�y�F:B�7U��7��;GTGX��7�7���F��7��fGcFF�@MGy��7j?�7n�Gc�\G-��G�P>HR��7���7�lHK�G��G`�G�\�F?,�7�gG��7���7ڥIG�
�7�eGG���7�m�7���7{d�7�WG
�
 BatchNorm_4/moving_variance/readIdentityBatchNorm_4/moving_variance*.
_class$
" loc:@BatchNorm_4/moving_variance*
T0
^
0hidden4/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden4/BatchNorm/moments/MeanMeanhidden4/Relu0hidden4/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden4/BatchNorm/moments/StopGradientStopGradienthidden4/BatchNorm/moments/Mean*
T0
e
5hidden4/BatchNorm/moments/sufficient_statistics/ShapeShapehidden4/Relu*
out_type0*
T0
�
4hidden4/BatchNorm/moments/sufficient_statistics/CastCast5hidden4/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden4/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden4/BatchNorm/moments/sufficient_statistics/GatherGather4hidden4/BatchNorm/moments/sufficient_statistics/Cast>hidden4/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden4/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden4/BatchNorm/moments/sufficient_statistics/countProd6hidden4/BatchNorm/moments/sufficient_statistics/Gather5hidden4/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden4/BatchNorm/moments/sufficient_statistics/SubSubhidden4/Relu&hidden4/BatchNorm/moments/StopGradient*
T0
�
Ahidden4/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden4/Relu&hidden4/BatchNorm/moments/StopGradient*
T0
w
Ihidden4/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden4/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden4/BatchNorm/moments/sufficient_statistics/SubIhidden4/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden4/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden4/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden4/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden4/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden4/BatchNorm/moments/ShapeConst*
dtype0*
valueB:2
�
!hidden4/BatchNorm/moments/ReshapeReshape&hidden4/BatchNorm/moments/StopGradienthidden4/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden4/BatchNorm/moments/normalize/divisor
Reciprocal5hidden4/BatchNorm/moments/sufficient_statistics/count8^hidden4/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden4/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden4/BatchNorm/moments/normalize/shifted_meanMul7hidden4/BatchNorm/moments/sufficient_statistics/mean_ss+hidden4/BatchNorm/moments/normalize/divisor*
T0
�
(hidden4/BatchNorm/moments/normalize/meanAdd0hidden4/BatchNorm/moments/normalize/shifted_mean!hidden4/BatchNorm/moments/Reshape*
T0
�
'hidden4/BatchNorm/moments/normalize/MulMul6hidden4/BatchNorm/moments/sufficient_statistics/var_ss+hidden4/BatchNorm/moments/normalize/divisor*
T0
o
*hidden4/BatchNorm/moments/normalize/SquareSquare0hidden4/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden4/BatchNorm/moments/normalize/varianceSub'hidden4/BatchNorm/moments/normalize/Mul*hidden4/BatchNorm/moments/normalize/Square*
T0
�
'hidden4/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_4/moving_mean*
valueB
 *���=
�
%hidden4/BatchNorm/AssignMovingAvg/subSubBatchNorm_4/moving_mean/read(hidden4/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_4/moving_mean*
T0
�
%hidden4/BatchNorm/AssignMovingAvg/mulMul%hidden4/BatchNorm/AssignMovingAvg/sub'hidden4/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_4/moving_mean*
T0
�
!hidden4/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_4/moving_mean%hidden4/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_4/moving_mean*
use_locking( *
T0
�
)hidden4/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_4/moving_variance*
valueB
 *���=
�
'hidden4/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_4/moving_variance/read,hidden4/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_4/moving_variance*
T0
�
'hidden4/BatchNorm/AssignMovingAvg_1/mulMul'hidden4/BatchNorm/AssignMovingAvg_1/sub)hidden4/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_4/moving_variance*
T0
�
#hidden4/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_4/moving_variance'hidden4/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_4/moving_variance*
use_locking( *
T0
�
hidden4/BatchNorm/IdentityIdentity(hidden4/BatchNorm/moments/normalize/mean"^hidden4/BatchNorm/AssignMovingAvg$^hidden4/BatchNorm/AssignMovingAvg_1*
T0
�
hidden4/BatchNorm/Identity_1Identity,hidden4/BatchNorm/moments/normalize/variance"^hidden4/BatchNorm/AssignMovingAvg$^hidden4/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden4/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden4/BatchNorm/batchnorm/addAddhidden4/BatchNorm/Identity_1!hidden4/BatchNorm/batchnorm/add/y*
T0
T
!hidden4/BatchNorm/batchnorm/RsqrtRsqrthidden4/BatchNorm/batchnorm/add*
T0
`
hidden4/BatchNorm/batchnorm/mulMulhidden4/Relu!hidden4/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden4/BatchNorm/batchnorm/mul_1Mulhidden4/BatchNorm/Identity!hidden4/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden4/BatchNorm/batchnorm/subSubBatchNorm_4/beta/read!hidden4/BatchNorm/batchnorm/mul_1*
T0
s
!hidden4/BatchNorm/batchnorm/add_1Addhidden4/BatchNorm/batchnorm/mulhidden4/BatchNorm/batchnorm/sub*
T0
�N
hidden5/weightsConst*
dtype0*�N
value�NB�N22"�N�>n°�n��nBy�n�ߧn�D�nB��nBHn�qLo��nn�djnBX2nBp�nº�n�"Go�6�nB~�n¦PnB>�n�=nB��nB`1n�\�nB�nBL�nB�o�Mo��n��n��	n���n1nBn�n��o�{�nB�n�nBo�'�mB��n���nB�vn�REn���m��oBDo�*�n�nBܝn¢Gn�"oBJ�nB��nBknB"�nBF"n�cnB�xnBڵnBDo�&o�^Zo �n��nB��n�l�nB��nB�gn��nB˸n��nBJcoB��n�Z�n�n�nTnB=Mn��m­4nB}nB\�n�@�n�0nB7oBnon���nB�[o���nBa�n�k�nB*Tn��jnB�ZnB+�nBz�m�knB�*oB"-n�ǃnB2�n°DnB��nB�9oB�nBN�n½o��}nB��nB�|nB,nB��n�,Rn��nBq=nB��mBoo��nB0!n�g�nB��n�.�n��TnB0sn��nB��n�N�nB�n�ZhnB'�nB�ZnB.GnB��nB�nB̪nBf oB��m�g�n��2oB�oBtnB��n�n�O�nBvqnBL�n�ƜnBV�nB	n���m�vWn�i�nB3>oB�mB��nB��nB��n�V�n�^�nB�nB�n�$un³o�'3n�<�mB7Zn�R�nB�nB�n��'nB�&n��dnBq!oB�En�'oB`�n��oB�on�mnB��nB��m�ۮnB�/nBBnB7nB�vnB��m»�nBRqnB��nBD�n�f�nB^	oB�nBWn�nB�ynB�n��nQn�n��n��n�ln¨fnB�nB~�n�n�n�`Cn��nB�2nBdoB�In�6oBh�n�Zn¢MoB��m���nB�oBh�n��oB(�nBU�nB�nOnB snB�nmn�&�nB+oB�m�L�n�&in�@,nB�nB�]n�jHnBHZn�ÍnBpInBLnn���n¢�nB�xnnrnBPPnB��nB��mB�pnB�_n�f�nB�nB\�n�opn�fanBNo��n�+8oBd1o�n±UnB=�m�R�n�{�nBy<n���nB�$o�7OnBb�nB�npnB$n�W[nB�{n�mB�jnB��nB�Tn�$�nB�nB_nB��n�nBo� oBS�nB�$nBX&o¡�nB�nB��nBj�n�E�nB+�nB�VnB�'oB��n�i�nPn®oB��m¢�n�}nB��mB��n�J
o·�n�t�nB��nBȮn�oBM�n�8]nB&�n�ރnB1�n�1�nB��nBP�n�U�m� �nBR.nB��m�D�n��Xn�r�n�fcn��n�n�nB��n�A�n�NAoBo�n¡�n�C�n�nBi�n��mwn»vn���n�}~n�9o�'n�j�nB��n¬n¢�nB��nB�n�s�nBi�nB�o�po�:mnB��nB`�nBPn���m¸rnBɚnB
Cn�I�n���nBj�n��nB��n��on�h�mB��mB��nB��n���nB�n�r�nBxdnB�nB�nB�nB�%nBg�nB��n���nBJ n��nB�HoB��nBj�n�|wnB�oB]oB�Qn�nB��nB%o®MnB]�nBn�nB�GnB��nB�nnB
�n�-Fn�n XnB{Ho�,AnBLoB��n©�n��nBmn�o�nBooB}o�6�nB�Ao�'dn��nBB�n¦/nB�n�`2oB�8n��nB�+oBR�nB��n¦�nB@�nB�-nB&2nBD�n�hPnnB�.oB��nB�`n¯fn�'oBj�nBZo�V�mB�8nB��nº�n�u�n¿�n��nB�On��ToB�oBB�nBnB��mB�o�nB9TnB�m���nB�o�s1nBUqn��)oBp�n�j�nBo�To�n¥RnB0`n�>n�rnB�znB�oB��n�nBZGoB��n��nB��nB�pn�snBy,n�uPnB�mn���nB"�m���nB��mB��nB��nB��mBoB<o�<}nBI�nB�GnBJoB��n©�nBsnB��n��n²oB^nB��n���n�A�n�n\nB��nB�n���n�ĘnB��n���nB�!o�X�nB�;oB�Uo�M�nBw�n�0�nBH�nB+LnB��n��oB,�n���n¹oBdTnB$�n�́nBjDnB;AnB��nB�nBh�n�=�nB6,nBfznB�o�-�nB�nB��nB�_nB��n�J@o�3n�n¬	oDnBpnB[�n��*nB�n���n�Z�nB�+oB�LnBr�n¾�nB�n��Tn��n�'�n²�nBP�nB�n³DnB��m�n�-o�6oB��nB�1n½Uo�?�nBR�n���m�]�n�o�nB*�nB��nB�xn��n��HnBn2nB�ln��n�d�nB��nB�n���nBoBmnB$�nB��nBr�n�2�nB4(nB*Vn»�n�bxnB��nB�n��oB`@n�c�n�qnBv�n�	�nB��nB�m�0nBJEonB�nB��n�hUnB��n�L�nB�n�M�nB�6nB8�mB�Kn§oB��nB1�mB��n �n¢[n�E�nBKEnB��nB�n�y�n��n�XnB.�n��CoB-�nB��nBZn��en�Z�nB��n�nB�n¨�n��n� inB��nBH�n��`n���nB�o±�nBPTo�.xnB�On�n���mB �n�&Zn�do�\aoB��m�x�n�Hnª�n¥o��?nB�]nBC�n���m¨�nB��nB��nBR_nB�n�A�m�8�nB�AnB��nfnB��n��/oBGnB��n��n�T�n�?5n��n��[nB2yn�S�nB-
o�:(nB�nB_oBz�n�nB_�mB�6n¸7o��n�mnnBk�n��nB"�n�(Un�FBn���nB�onBPnBm�nB<{nB�Xn��2n�LsnBv�nBa�nBq�n�0�nBm�nB΁n���n��n��n�nB��nB��mB��n�=+nB�knB��nB&|nB��nB�}nB^nB�FnB�nB�onB0�nBfXnB�n��znBto�"�n�
Un�p�nB<�nBV�n¨�nB��mBxon��nB��n¸ZnB�vn¬�n�1�n�� o¿�n�z1o��nBjn�~n��n�4�n�?�nBԔnB�HnBd!o�"�nBo���nBOnB�~nB>n���n�wenBPn��4oBoB�[n��NnB��m�	Xn �n��Po�8�n��n�*�n���m��DnB��n6nB��nB-�n�do¤+nB��nB&^n���n��n�hon��Fn�<�nB�dn�	mnB��n½�nBܦnB�LnB@lnB�Yn�*�m�	9o�bnB��nBy�nB(;o��[nB�6oBTgn��wnn�D�n��nB�HnB�oB<�n��nB��n�I�mBKoB<�nB�nB��nBүnB�]nB@�nB�@nB��n� �m�:�n�m�v�nBenBE#n�Wpn¥�n�h�nB��nB:�nB�oB�Yn��o�v�n¡�m²lnBw�n���nB�nB�n�E=nB�`nB
EoB�Gnª�n��anB��n�n�DoBԐnB�An�^�n�$Rn��nB��nB��noB�n�DnBu3oB�n .n�DoBR'n±�n�lnB�2nBo2oB�n�nB%n�z&nB6nB��nB�nB�nB�\nB�ZnB|oB)rn�n���n��nBA�n�̽nB��n��nB� nBM�n�,snBE�n���n�{o��SnB�oB��nB�HnB�nB��nB�Tn�tn�X	n��`n�-�nB�2n� �nB�n¥HnB�n��nB�vn�nB�nB�nBL�nB�nBenB��n�VLnB��nB��nBs�nBK�n�QynVn���nB��mB�%nB
�n�n��n��nB�sn�X�n�>JnB~>o�\nB6Un��n�C�mBq�n½yn�trnoB��n�nB��nBk�nB�n�zAnBK�nB޸nB�nB��n�Ahn�WnB�WnB='nB�n�/�n�lnBsgnBJ�n¤�nBB�nB��n���m�Yo�4�mBOnB?�n���nBf�nBS�n�]MnB�nB�2o��FnBxnB��n�DnB��n��nB42o��m�yn�F�nB&�n�E2n�pnBB�m�Eyn��n��nB��nB��nB��nBr/nBtnBHn�8�nB�nBtn�j�nB:o���nB�n¬\nB��n´'oBFKnB�qnBn�nBP�nB�AnB�"n��nBw�n�Do�بnB�n�InB�GnB4<nBCAnB��mB�KoBZEnn���n��6n�7un�nB`en�\n�n�-nB �nB��nB)�mB�%n���n�ڶn½6nB�:nBoB!�n��nB�AnB,�n�n��n���n��qnB�nB�[nB��n���nB@+oBĻnB�n�c+oB/ZnB��nBݢnBz�n�Z�nB�8nB��nB�nB��nB�nB[vn�D�n�7�nB��nBvnB��nB[in��|n-n��nB��n��nBZ�nB`�n���mBY2n�Vn�fLoBM�n�E�nB�6n��nBԝn¬�n�V�nB0JoBnDn£ nB42oBwnB�n�mnB2�nBu�nB;�nB��n�Dun²�nB�JnBn�n�nB�oB�on���n��n�yoB1cnB��n���nB׋nB�^n�.�n��Dn���n�!zn�n�Z�nB�hn»^n�n��n���nB��n�ڨnB�NnºnBa�nB;MnBҸn��n��nBXsn��nB��n�ԧnBo¥�mB�nB7
o�>Oo�h�nBt�n���m�y�nB��nB�n�`KoB�6nBy�nB��n%oB�.oB EoB`SnBc/nB�unB�n���nB��n�P�n�\n½�nB�`nB��n���nB��nen���nB�n�!nBG�m��n�#�nB� o�dn�o.nB��n��n}n�P�n©(o�a�nBR�nB�bo�ӭnB3�nB�-nB�nB��nB��m�e�n�w�nBnB,nB��nB��m��MnB�(nB�vn��n�i�n�F�m��!n�zn��ynBo�nB�nBܤnB3�nopnB"nB(nBy�nBFn�m+o�n�.�nB��n�.�nB&�nB��n�[#oB3{n¦�n�qnB�o�C�mB��n�'�nB��n��n��nnB�nB��n��oB��nB��nB�nBJ#no�:wnB�oB��nB��n�Y�nAnB�&oBA�n��nB� oBD	o£rn�yJn� �nB�nB��nBJGnB֔nB�	o��n�a`nBtoBv�nµ�nB�7o��m��oB�+n�KInBgoB��n�5EnBzn��NnB��mBZ)n��hnB��n�PoBWFn¦o�!�nB0@nB^�n�e�nB��nBFnBo�z$oBJ�n�0)nBthnB�oB=�n��nB�nB�\nB؈n�nBΞnB8o��0o��)o¶BnB�nB��n%oB�$nB5$n�ºnBB�nB
�n� inB�nB��n�u�n�8nBan�0�nB{�nB��m¤�nB/n�n!nB��n�p�nBפn±QnBM�n�ȰnB��mB6�nB��n�E�nB)�nB[�nB��n���nB��n�ȣnBp�nB��nBi�m¿HoBXnBH�nB�'o�D�nB�?nB�VnB�nB\@o�xGoB%|nB�oBW^nB�kn¬�n���nB��nB�n�"�nB�nB�n�nB��n���nB�gn¶�mB�4n´OnB�n®n�j6nB�jn2o¦�n»�nB�WnB*6nBЧnB�UnB��mBz�m�\oB�nB�nnB\FnBOnB*n�5nB�.o¨n��nB�RnBԊnBA�mB
@nB�n�]�nB�o��nB��nB�n��KnB��nB�n�7�m��nBoo�U�n��n¸cn�nBO0n�FPnBf�nB��n�JnBwRo�:nB\gnB_o�C�nB��n��nnB|Pn�|nB$FnB�|nBPDn��pnB��nB��mB>�n�@.oB|JnB�MnB�IoBёnB�[n�ПnB��nB"nB�&o�
BnBr�nB�>oBqnBIo��nB>mnB)nBP�nBT�nB$�n�L�nB nB��n�>nB��nB�n¥Wn�n�|�nB+�nBHnB�Dn�7�nB��n���n¨MnBX�n�'�n��Un��{nB5OnB��nBa�nBf�nB�OoB��n�'GnB��mB�Hn�r�nB��n�+nB�n�nB�n�ɢnB8�nB(�mB^nBb�nBnB�n�p<oB��n�n�-�n��n®Mn�ƯnBR�nBb�n�>�n�n�7�nB�Do��nBAgnB�n�I7oBj�n��n�8oB@�m�nB��nB�in�2"oB�Noª^nB��m��'n��nB2Mn�M�n�ĦnBN�n��n�Yn��Kn¬onB�XnB�o��nB��n5nB=�nB�$n�n 'nBJnn�.Ln�nB nBŹnB��mB nB��m�roB��n�h9n�y�nB�nB�nBUoB��nB�Dn� #nBo�nB��nB�nB��nB��n�nBo�h8o��gn���nB�nB��n�0nB��n�02n�$o���nB��nBknBF�nBXtnB^�n§�nBk�n�RjnBB
nBnB�n�y�mB�Tn��oBn�n�6�n��
oBԝn°�n�2Pn���nSnBz'nB�\nB�nB��n·�nB=nBlonB��mB��n�H�n���n�n�nB��n½�m���nnBkbn�N�mB?KoBY�m��en�Kn���nB�nB��nB�mB�ynB�gnBq�n£�nB��n�n���nB-dnB�&oB`�n¯cnBj�nB�nB�nB�nB��nB�oBhqnBMUo�N�nBkCnB٤n�An��Fn�Yo��nB�4n���m�+mn�|@n�n��]nBd�nB�0n�$o�.�n�p�nB��nBJoBRTn�PnB3�nByNo�koB
]nB�anB��n�fKn��bnBan�-tnBO<n�d"nB�|n� o�hFnB �n�^�nB:�n�9InB�Sn��nB�!n¶5n��n�b�nBk�n�i;n�
LoB�4o��9n·�nBcWn�M]n�&�n�^�m�n�p�nB��nB��n��nB�InB�Qn�7�nB�wn��nB�o�ߔn�>�nB�}n���n��n�oµ�nB�*nB}un�WCo��Pn�nBoBt�n¾�nB�TnB�3nB��nBPnB��n��nB�nBN�nB��n��CoB�5o�nB�n�K�mBz�m��2n��o�,Hn¼�n%nB��mB��m�n>oB�o�H/n���nBoB�n�nBzZnB�n�0�n¯�n�8rn�#�n�$<nBin��oB3~n°�n���nBN�n��^n�{�n��nB-nB*)nB��nBv�nBk�n��oLnB�nB8nn�Sn�"�n���nB��n±^nB>�nn�EnB�nB$Yo��nB�5nBV�n�'�nB߽n��nB/UoB�eoBG�nB^GoBh,nB�nB	XnB��nB,oun� o�8�nB@4nBēnBl�mB�n�fSnoB��n�Fun�ƀnB�4n²rn�%�n¸BnB�HnB��m��nB��nB@nBN�n�n¯�nB�ln�d�nBܜn�3nB/n¬|nB�Nn�o!oB�nB
�nB�n�W�nB�oB<�n���nB�o��+nB�EnB�xn�j�nB�DnB#�n�(nB�oB>wn��oB��nB]vn�Evn�jrn�ˇn�4nB\oB�oºmnB�<n�V�n�"�nB�>n�ߏnB=Yn¾BoB�n�4ynB�	oB��nBno©�nB%�nBNznB�$nB��n�j;n�WgnB{FoB�oB�bn�޸n�EoB��nB�rn�g�n³�nB�Wo�\(n�l/n��n�j�n���n�g�m�,-nB�oB�%nB!�n«�n���nBV�nBrgnB��mB�xn�nB�o�n«|nB�n��nB��nB�sn2nBoBH�nB�&nco�HnB�n��o��FnB
�nB��n¡�n�`o�(nBk�nB`n�78nB�o��oBkunBy�n�rPn�=�nBJ�n�z�n�F�nBaoB��nB2�nB	�nBO.n�t�nB��n�n�IznB"oB�jn�#nB&�n�z�m�mBKEnB�nB��n��knB��n�\�nBv�n�v�n��CnB�n�QnB�o�wznB�3n�y�mBAnBrZnBĽnB3JnBq�nB�nBT�nB.o�jMnª:nB0�nBr�nBSn�Y
oº�nB�nB�%o��"nB:�nBӛn�n�d-n°,nB2�nB��n�D�nBI�nB��n�:Ao��nB��nB��n�"!nBo�MoBʭnB[pnB�	o��aoB��n�nB�Sn·�nB��n�?�nB[�nBn�n�YznBE�nB$SoBI�n�x�nB��nB��n�~fnB��nB��n��BnBf�n±�nBX}nBc�nB��m�d;nB��n�+nB.xn�"�nBc�nBVinB�nB��nBD�nBD+oB4�n�:UnB
?nB�Co´n�
wnBR�nB}�nBq�n���n�U+oB �nB�n�0�nBnB*o�ՠnB��n�o�m��nB��nB��nB��n anB��n�Sn��lnynBP�nBcnB��nB��nB&�n�nB|n�ӲnB`�nB}WnB��n�ԜnB��nB�nB��n,nB��nB�n�ayn�pCo²�nB�6nBl/n��nB�n�H�nB�^n�Vsn¶SnB��nB��n�nBnB��nB�]nBكnBJ�nXnB��nBOgn���n¸�n��8nB{�n��nB��nBr}n�n��n�z^n�L�nBoB��n�U�nB&o���nB�Mn�̯n�^�nB��nB�n�|�nB�n�6nB׀n�4Mn�b�mB��nBc�n��n� (oBl�nB,�n��nBZ�nBN�n�1
o���mB��nBb�n�zun�n�OSn�w�nB]Jn�2�n�x�nB`Qo�RknB��n½�nB��nB��n�84oB0n��#nB=�n��nBb�nB��mB�Wn�GoB�nB�nB�n��nB��nB��nB�qnB��nB͍n¢oB@oB�"oB�n�BoB?�nB9nB~dnBp8n�P1oB�An�dVnB�n�J.o�Tmn�n�nBz�n��ln�ǌn���nB�dnB�1o�xn�x�n�^vnB>n�nB �m�Z�nB1oBAn��On�:VnB�nB}n¸�n�eo�
�nB�no�1�mB�On�?�n�RnB�n���nBOhn��nB�n�"WnB�An���n 	o+nB�n���n�N?oB8Io�
�n�(nB͢nBEn �nB��nBTn�n�8VnB�/n§�nB��mBnBb5o�oUo�ڥnB[0oBu�n�9nB�n�Xn�T�nB?n��nB��n���nB�n��nB�~nBPnB�n�@{nBdVnB�OoB�Un��2oBѸn�mB�oB!'oB�n¼�nB�n�,nBl�n��MnB��nBk�mB�7nB�Nn���n�;n��7n�s�n�BnB�<nBXnBlyn�Q<n��n�߹n �nBJ}nB�an��n�,jn�q�m�εnB��n�hVnB�oB�o�ĞnBl�nB 8nB��n��hn�q�n� n��on��n£�nB-�n®�mo��SnB'�nBԇn·~nB��n�e�nB�nBE�m�GEn�~�mB|]n�ڔn�H.oB" nB�;nB��nBܯnBnZoB�nB��n� �n�C�nB%nB�n �nB}Gn�n���nB�o�e3nBen��wnB4�n�.|nB��n©jn oB��n�	in���n�N&nB5�n�q>nBX�nB�WnB%%nBD�nBcoB�mnB�oB#zn��n�2CnBnnB�
oBq�n¤�n�#NoBH�nB&�n�nB��mB��n¦�n�2�n���mB{HoB��nB^oB�n�n�H�n�nInB�o�tLoBYn¦�n´�nB/=o�ԜnBNHnB<(n�N�nB_�n��n��nnB	n�Yn��n¹�nB�n�0�n�V�nB�QnB�"n¬�nBnpnBpQoB��nBzen¸*n�F&o�Z9nB��nBb�nVnB��n�dfnB��n�A�mB�nB�Un��En��n�
^
hidden5/weights/readIdentityhidden5/weights*"
_class
loc:@hidden5/weights*
T0
�
hidden5/biasesConst*
dtype0*�
value�B�2"�z�n�^�n�|�nB|�n�~�n�{�nB|�n�o�n�z�nBa�nB{�n�z�nB|�n�]�n�X�n�|�nB|�n�x�n�x�nBy�nBx�n�|�nBv�n�E�n�~�nBy�n�g�n�w�n�g�nB{�n�n�n�|�n�{�n�|�n�{�nB|�n�t�n�|�n�q�n�t�n�y�nBx�n�y�nB|�n�|�nBx�n�s�n�|�n�i�n�w�n�
[
hidden5/biases/readIdentityhidden5/biases*!
_class
loc:@hidden5/biases*
T0
�
hidden5/MatMulMatMul!hidden4/BatchNorm/batchnorm/add_1hidden5/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden5/addAddhidden5/MatMulhidden5/biases/read*
T0
*
hidden5/ReluReluhidden5/add*
T0
�
BatchNorm_5/betaConst*
dtype0*�
value�B�2"�w�n�J�n�v�n�z�n�y�nB|�nB|�n�t�n�}�n�G�n�y�nBv�nB|�nBR�n�i�nB|�n�|�n�u�nBu�n�k�nBt�nB|�n�m�nB{�n�z�nBx�n�o�nBw�nBG�n�z�n�v�nB|�n�z�n�v�n�|�n�~�nBc�nBx�n�x�n�[�n�w�nBq�nBj�n�|�n�}�nB|�n�i�n�|�nBt�nBZ�nB
a
BatchNorm_5/beta/readIdentityBatchNorm_5/beta*#
_class
loc:@BatchNorm_5/beta*
T0
�
BatchNorm_5/moving_meanConst*
dtype0*�
value�B�2"���L5��5��wG���5��5�
G��$Gy}^5��H5�,CH�ZF A%G��E|5]��F��]F٪�5e_�G
�-5�	GЎ5��05X�ZF�5��wG�]5q�E
�5�o55R�N5�5���4Y5��5��wGe;`5rBCyr 5�]m5�M5�	G1�D5��5�=51��FX�=5�}5�f5أ�5��2C
v
BatchNorm_5/moving_mean/readIdentityBatchNorm_5/moving_mean**
_class 
loc:@BatchNorm_5/moving_mean*
T0
�
BatchNorm_5/moving_varianceConst*
dtype0*�
value�B�2"��Z�7Lk�76��GQ��7���7�)G���FkF�734�7��F�.G|'XG�a�FpS�7���G�6WG2��7k �Gs��7���G��7�/�7Ѿ$GT��7]�aG���7�\�F'��7Y��7���7��7�T�7R�7Es�7��pG���7J(�Gyg�7�7�%�7�k>H}M�7�v�7�0�7@R�G�c�78�7Yf�7j��7��G
�
 BatchNorm_5/moving_variance/readIdentityBatchNorm_5/moving_variance*.
_class$
" loc:@BatchNorm_5/moving_variance*
T0
^
0hidden5/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden5/BatchNorm/moments/MeanMeanhidden5/Relu0hidden5/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden5/BatchNorm/moments/StopGradientStopGradienthidden5/BatchNorm/moments/Mean*
T0
e
5hidden5/BatchNorm/moments/sufficient_statistics/ShapeShapehidden5/Relu*
out_type0*
T0
�
4hidden5/BatchNorm/moments/sufficient_statistics/CastCast5hidden5/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden5/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden5/BatchNorm/moments/sufficient_statistics/GatherGather4hidden5/BatchNorm/moments/sufficient_statistics/Cast>hidden5/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden5/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden5/BatchNorm/moments/sufficient_statistics/countProd6hidden5/BatchNorm/moments/sufficient_statistics/Gather5hidden5/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden5/BatchNorm/moments/sufficient_statistics/SubSubhidden5/Relu&hidden5/BatchNorm/moments/StopGradient*
T0
�
Ahidden5/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden5/Relu&hidden5/BatchNorm/moments/StopGradient*
T0
w
Ihidden5/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden5/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden5/BatchNorm/moments/sufficient_statistics/SubIhidden5/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden5/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden5/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden5/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden5/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden5/BatchNorm/moments/ShapeConst*
dtype0*
valueB:2
�
!hidden5/BatchNorm/moments/ReshapeReshape&hidden5/BatchNorm/moments/StopGradienthidden5/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden5/BatchNorm/moments/normalize/divisor
Reciprocal5hidden5/BatchNorm/moments/sufficient_statistics/count8^hidden5/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden5/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden5/BatchNorm/moments/normalize/shifted_meanMul7hidden5/BatchNorm/moments/sufficient_statistics/mean_ss+hidden5/BatchNorm/moments/normalize/divisor*
T0
�
(hidden5/BatchNorm/moments/normalize/meanAdd0hidden5/BatchNorm/moments/normalize/shifted_mean!hidden5/BatchNorm/moments/Reshape*
T0
�
'hidden5/BatchNorm/moments/normalize/MulMul6hidden5/BatchNorm/moments/sufficient_statistics/var_ss+hidden5/BatchNorm/moments/normalize/divisor*
T0
o
*hidden5/BatchNorm/moments/normalize/SquareSquare0hidden5/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden5/BatchNorm/moments/normalize/varianceSub'hidden5/BatchNorm/moments/normalize/Mul*hidden5/BatchNorm/moments/normalize/Square*
T0
�
'hidden5/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_5/moving_mean*
valueB
 *���=
�
%hidden5/BatchNorm/AssignMovingAvg/subSubBatchNorm_5/moving_mean/read(hidden5/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_5/moving_mean*
T0
�
%hidden5/BatchNorm/AssignMovingAvg/mulMul%hidden5/BatchNorm/AssignMovingAvg/sub'hidden5/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_5/moving_mean*
T0
�
!hidden5/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_5/moving_mean%hidden5/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_5/moving_mean*
use_locking( *
T0
�
)hidden5/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_5/moving_variance*
valueB
 *���=
�
'hidden5/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_5/moving_variance/read,hidden5/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_5/moving_variance*
T0
�
'hidden5/BatchNorm/AssignMovingAvg_1/mulMul'hidden5/BatchNorm/AssignMovingAvg_1/sub)hidden5/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_5/moving_variance*
T0
�
#hidden5/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_5/moving_variance'hidden5/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_5/moving_variance*
use_locking( *
T0
�
hidden5/BatchNorm/IdentityIdentity(hidden5/BatchNorm/moments/normalize/mean"^hidden5/BatchNorm/AssignMovingAvg$^hidden5/BatchNorm/AssignMovingAvg_1*
T0
�
hidden5/BatchNorm/Identity_1Identity,hidden5/BatchNorm/moments/normalize/variance"^hidden5/BatchNorm/AssignMovingAvg$^hidden5/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden5/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden5/BatchNorm/batchnorm/addAddhidden5/BatchNorm/Identity_1!hidden5/BatchNorm/batchnorm/add/y*
T0
T
!hidden5/BatchNorm/batchnorm/RsqrtRsqrthidden5/BatchNorm/batchnorm/add*
T0
`
hidden5/BatchNorm/batchnorm/mulMulhidden5/Relu!hidden5/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden5/BatchNorm/batchnorm/mul_1Mulhidden5/BatchNorm/Identity!hidden5/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden5/BatchNorm/batchnorm/subSubBatchNorm_5/beta/read!hidden5/BatchNorm/batchnorm/mul_1*
T0
s
!hidden5/BatchNorm/batchnorm/add_1Addhidden5/BatchNorm/batchnorm/mulhidden5/BatchNorm/batchnorm/sub*
T0
�
hidden6/weightsConst*
dtype0*�
value�B�2"�*�n¶�nB^�n�8DnB��nBKoBkXo�eunBZnB�nB��m�on�P0n�`�nB��n�?�n�mB��nB�qnB�n�G�nB�.o�nBNnBoBn�Y�nª�n�S�nB�nB��mBDpn�

o»�nXnBPeo���m�G�nB�InB��n�n���nBc�n��nBR/nB�0oB��mB��n!oB6xn¸�nB
^
hidden6/weights/readIdentityhidden6/weights*"
_class
loc:@hidden6/weights*
T0
?
hidden6/biasesConst*
dtype0*
valueB*~�nB
[
hidden6/biases/readIdentityhidden6/biases*!
_class
loc:@hidden6/biases*
T0
�
hidden6/MatMulMatMul!hidden5/BatchNorm/batchnorm/add_1hidden6/weights/read*
transpose_b( *
transpose_a( *
T0
@
hidden6/addAddhidden6/MatMulhidden6/biases/read*
T0
*
hidden6/ReluReluhidden6/add*
T0
A
BatchNorm_6/betaConst*
dtype0*
valueB*a� A
a
BatchNorm_6/beta/readIdentityBatchNorm_6/beta*#
_class
loc:@BatchNorm_6/beta*
T0
H
BatchNorm_6/moving_meanConst*
dtype0*
valueB*�U�5
v
BatchNorm_6/moving_mean/readIdentityBatchNorm_6/moving_mean**
_class 
loc:@BatchNorm_6/moving_mean*
T0
L
BatchNorm_6/moving_varianceConst*
dtype0*
valueB*� �7
�
 BatchNorm_6/moving_variance/readIdentityBatchNorm_6/moving_variance*.
_class$
" loc:@BatchNorm_6/moving_variance*
T0
^
0hidden6/BatchNorm/moments/Mean/reduction_indicesConst*
dtype0*
valueB: 
�
hidden6/BatchNorm/moments/MeanMeanhidden6/Relu0hidden6/BatchNorm/moments/Mean/reduction_indices*
T0*
	keep_dims(*

Tidx0
_
&hidden6/BatchNorm/moments/StopGradientStopGradienthidden6/BatchNorm/moments/Mean*
T0
e
5hidden6/BatchNorm/moments/sufficient_statistics/ShapeShapehidden6/Relu*
out_type0*
T0
�
4hidden6/BatchNorm/moments/sufficient_statistics/CastCast5hidden6/BatchNorm/moments/sufficient_statistics/Shape*

DstT0*

SrcT0
l
>hidden6/BatchNorm/moments/sufficient_statistics/Gather/indicesConst*
dtype0*
valueB: 
�
6hidden6/BatchNorm/moments/sufficient_statistics/GatherGather4hidden6/BatchNorm/moments/sufficient_statistics/Cast>hidden6/BatchNorm/moments/sufficient_statistics/Gather/indices*
validate_indices(*
Tparams0*
Tindices0
c
5hidden6/BatchNorm/moments/sufficient_statistics/ConstConst*
dtype0*
valueB: 
�
5hidden6/BatchNorm/moments/sufficient_statistics/countProd6hidden6/BatchNorm/moments/sufficient_statistics/Gather5hidden6/BatchNorm/moments/sufficient_statistics/Const*
T0*
	keep_dims( *

Tidx0
y
3hidden6/BatchNorm/moments/sufficient_statistics/SubSubhidden6/Relu&hidden6/BatchNorm/moments/StopGradient*
T0
�
Ahidden6/BatchNorm/moments/sufficient_statistics/SquaredDifferenceSquaredDifferencehidden6/Relu&hidden6/BatchNorm/moments/StopGradient*
T0
w
Ihidden6/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indicesConst*
dtype0*
valueB: 
�
7hidden6/BatchNorm/moments/sufficient_statistics/mean_ssSum3hidden6/BatchNorm/moments/sufficient_statistics/SubIhidden6/BatchNorm/moments/sufficient_statistics/mean_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
v
Hhidden6/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indicesConst*
dtype0*
valueB: 
�
6hidden6/BatchNorm/moments/sufficient_statistics/var_ssSumAhidden6/BatchNorm/moments/sufficient_statistics/SquaredDifferenceHhidden6/BatchNorm/moments/sufficient_statistics/var_ss/reduction_indices*
T0*
	keep_dims( *

Tidx0
M
hidden6/BatchNorm/moments/ShapeConst*
dtype0*
valueB:
�
!hidden6/BatchNorm/moments/ReshapeReshape&hidden6/BatchNorm/moments/StopGradienthidden6/BatchNorm/moments/Shape*
Tshape0*
T0
�
+hidden6/BatchNorm/moments/normalize/divisor
Reciprocal5hidden6/BatchNorm/moments/sufficient_statistics/count8^hidden6/BatchNorm/moments/sufficient_statistics/mean_ss7^hidden6/BatchNorm/moments/sufficient_statistics/var_ss*
T0
�
0hidden6/BatchNorm/moments/normalize/shifted_meanMul7hidden6/BatchNorm/moments/sufficient_statistics/mean_ss+hidden6/BatchNorm/moments/normalize/divisor*
T0
�
(hidden6/BatchNorm/moments/normalize/meanAdd0hidden6/BatchNorm/moments/normalize/shifted_mean!hidden6/BatchNorm/moments/Reshape*
T0
�
'hidden6/BatchNorm/moments/normalize/MulMul6hidden6/BatchNorm/moments/sufficient_statistics/var_ss+hidden6/BatchNorm/moments/normalize/divisor*
T0
o
*hidden6/BatchNorm/moments/normalize/SquareSquare0hidden6/BatchNorm/moments/normalize/shifted_mean*
T0
�
,hidden6/BatchNorm/moments/normalize/varianceSub'hidden6/BatchNorm/moments/normalize/Mul*hidden6/BatchNorm/moments/normalize/Square*
T0
�
'hidden6/BatchNorm/AssignMovingAvg/decayConst*
dtype0**
_class 
loc:@BatchNorm_6/moving_mean*
valueB
 *���=
�
%hidden6/BatchNorm/AssignMovingAvg/subSubBatchNorm_6/moving_mean/read(hidden6/BatchNorm/moments/normalize/mean**
_class 
loc:@BatchNorm_6/moving_mean*
T0
�
%hidden6/BatchNorm/AssignMovingAvg/mulMul%hidden6/BatchNorm/AssignMovingAvg/sub'hidden6/BatchNorm/AssignMovingAvg/decay**
_class 
loc:@BatchNorm_6/moving_mean*
T0
�
!hidden6/BatchNorm/AssignMovingAvg	AssignSubBatchNorm_6/moving_mean%hidden6/BatchNorm/AssignMovingAvg/mul**
_class 
loc:@BatchNorm_6/moving_mean*
use_locking( *
T0
�
)hidden6/BatchNorm/AssignMovingAvg_1/decayConst*
dtype0*.
_class$
" loc:@BatchNorm_6/moving_variance*
valueB
 *���=
�
'hidden6/BatchNorm/AssignMovingAvg_1/subSub BatchNorm_6/moving_variance/read,hidden6/BatchNorm/moments/normalize/variance*.
_class$
" loc:@BatchNorm_6/moving_variance*
T0
�
'hidden6/BatchNorm/AssignMovingAvg_1/mulMul'hidden6/BatchNorm/AssignMovingAvg_1/sub)hidden6/BatchNorm/AssignMovingAvg_1/decay*.
_class$
" loc:@BatchNorm_6/moving_variance*
T0
�
#hidden6/BatchNorm/AssignMovingAvg_1	AssignSubBatchNorm_6/moving_variance'hidden6/BatchNorm/AssignMovingAvg_1/mul*.
_class$
" loc:@BatchNorm_6/moving_variance*
use_locking( *
T0
�
hidden6/BatchNorm/IdentityIdentity(hidden6/BatchNorm/moments/normalize/mean"^hidden6/BatchNorm/AssignMovingAvg$^hidden6/BatchNorm/AssignMovingAvg_1*
T0
�
hidden6/BatchNorm/Identity_1Identity,hidden6/BatchNorm/moments/normalize/variance"^hidden6/BatchNorm/AssignMovingAvg$^hidden6/BatchNorm/AssignMovingAvg_1*
T0
N
!hidden6/BatchNorm/batchnorm/add/yConst*
dtype0*
valueB
 *o�:
p
hidden6/BatchNorm/batchnorm/addAddhidden6/BatchNorm/Identity_1!hidden6/BatchNorm/batchnorm/add/y*
T0
T
!hidden6/BatchNorm/batchnorm/RsqrtRsqrthidden6/BatchNorm/batchnorm/add*
T0
`
hidden6/BatchNorm/batchnorm/mulMulhidden6/Relu!hidden6/BatchNorm/batchnorm/Rsqrt*
T0
p
!hidden6/BatchNorm/batchnorm/mul_1Mulhidden6/BatchNorm/Identity!hidden6/BatchNorm/batchnorm/Rsqrt*
T0
i
hidden6/BatchNorm/batchnorm/subSubBatchNorm_6/beta/read!hidden6/BatchNorm/batchnorm/mul_1*
T0
s
!hidden6/BatchNorm/batchnorm/add_1Addhidden6/BatchNorm/batchnorm/mulhidden6/BatchNorm/batchnorm/sub*
T0
>
logitsIdentity!hidden6/BatchNorm/batchnorm/add_1*
T0